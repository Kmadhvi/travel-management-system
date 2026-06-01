import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { TravelRequestService } from '../../core/services/travel-request.service';
import { AuthService } from '../../core/services/auth.service';
import { ItineraryService } from '../../core/services/itinerary.service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReplacePipe } from '../../shared/pipes/replace.pipe';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,
    MatStepperModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatSnackBarModule, RouterLink, MatDialogModule, ReplacePipe],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent implements OnInit{
  requestData: any;
  approvalComment: string = '';
  itineraryData: any = null;
  loading = false;
  currentUser : any;
  showAddItinerary = false;
  itineraryFormData = {
    segments: [{ type: '', from: '', to: '', time: '' }],
    hotel: '',
    checkIn: '',
    checkOut: '',
    notes: ''
  };

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private travelService: TravelRequestService,
    private itineraryService: ItineraryService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(+id);
      this.loadItinerary(+id);
    }
  }

  loadDetails(id: number) {
    this.travelService.getById(id).subscribe({
      next: (data) => {
        this.requestData = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error loading request details.', 'Close', { duration: 3000 });
      }
    });
  }

  loadItinerary(id: number): void {
    this.itineraryService.getByRequestId(id).subscribe({
      next: (data) => {
        this.itineraryData = data;
      },
      error: () => this.itineraryData = null // not added yet, show placeholder
    });
  }

  isManager()  { return this.currentUser?.role === 'MANAGER'; }
  isFinance()  { return this.currentUser?.role === 'FINANCE'; }
  isEmployee() { return this.currentUser?.role === 'EMPLOYEE'; }

  canManagerAct() {
    return this.isManager() && this.requestData?.status === 'PENDING_MANAGER';
  }

  canFinanceAct() {
    return this.isFinance() && this.requestData?.status === 'PENDING_FINANCE';
  }

  isApproved() {
    return this.requestData?.status === 'APPROVED';
  }

  canAddItinerary() {
    return this.isApproved() || (this.isEmployee() && this.requestData?.employeeId === this.currentUser?.id);
  }

  approveAsManager() {
    this.loading = true;
    this.travelService.approveByManager(this.requestData.id, this.currentUser.id, this.approvalComment)
      .subscribe({
        next: () => {
          this.snackBar.open('Approved by Manager!', 'Close', { duration: 3000 });
          this.approvalComment = '';
          this.loadDetails(this.requestData.id);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Error approving request.', 'Close', { duration: 3000 });
        }
      });
  }

  approveAsFinance() {
    this.loading = true;
    this.travelService.approveByFinance(this.requestData.id, this.approvalComment)
      .subscribe({
        next: () => {
          this.snackBar.open('Final Approval Successful!', 'Close', { duration: 3000 });
          this.approvalComment = '';
          this.loadDetails(this.requestData.id);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Error approving request.', 'Close', { duration: 3000 });
        }
      });
  }

  rejectRequest() {
    if (!this.approvalComment) {
      this.snackBar.open('Please add a comment before rejecting.', 'Close', { duration: 3000 });
      return;
    }
    this.loading = true;
    this.travelService.reject(this.requestData.id, this.approvalComment)
      .subscribe({
        next: () => {
          this.snackBar.open('Request rejected.', 'Close', { duration: 3000 });
          this.approvalComment = '';
          this.loadDetails(this.requestData.id);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Error rejecting request.', 'Close', { duration: 3000 });
        }
      });
  }

  openAddItinerary() {
    this.showAddItinerary = true;
    if (this.itineraryData) {
      this.itineraryFormData = {
        segments: this.itineraryData.segments || [{ type: '', from: '', to: '', time: '' }],
        hotel: this.itineraryData.stay?.hotel || '',
        checkIn: this.itineraryData.stay?.checkIn || '',
        checkOut: this.itineraryData.stay?.checkOut || '',
        notes: this.itineraryData.notes || ''
      };
    }
  }

  closeAddItinerary() {
    this.showAddItinerary = false;
    this.resetItineraryForm();
  }

  resetItineraryForm() {
    this.itineraryFormData = {
      segments: [{ type: '', from: '', to: '', time: '' }],
      hotel: '',
      checkIn: '',
      checkOut: '',
      notes: ''
    };
  }

  addSegment() {
    this.itineraryFormData.segments.push({ type: '', from: '', to: '', time: '' });
  }

  removeSegment(index: number) {
    this.itineraryFormData.segments.splice(index, 1);
  }

  saveItinerary() {
    const requestId = this.requestData.id;
    const payload = {
      travelRequestId: requestId,
      segments: this.itineraryFormData.segments,
      stay: {
        hotel: this.itineraryFormData.hotel,
        checkIn: this.itineraryFormData.checkIn,
        checkOut: this.itineraryFormData.checkOut
      },
      notes: this.itineraryFormData.notes
    };

    const operation = this.itineraryData ? 
      this.itineraryService.update(this.itineraryData.id, payload) :
      this.itineraryService.create(payload);

    operation.subscribe({
      next: (data) => {
        this.itineraryData = data;
        this.showAddItinerary = false;
        this.resetItineraryForm();
        this.snackBar.open('Itinerary saved successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error saving itinerary.', 'Close', { duration: 3000 });
      }
    });
  }

  getStatusClass(status: string) {
    return 'status-' + status.toLowerCase();
  }

  calculateTotalExpenses(): number {
    if (!this.requestData?.expenses || this.requestData.expenses.length === 0) {
      return 0;
    }
    return this.requestData.expenses.reduce((sum: number, expense: any) => sum + (expense.amount || 0), 0);
  }

  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'APPROVED':
        return 'status-approved';
      case 'REJECTED':
        return 'status-rejected';
      case 'PENDING_MANAGER':
        return 'status-pending';
      case 'PENDING_FINANCE':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  }
}
