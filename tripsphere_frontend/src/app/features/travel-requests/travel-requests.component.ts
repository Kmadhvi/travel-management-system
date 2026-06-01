import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TravelRequestService } from '../../core/services/travel-request.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-travel-requests',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterLink,
    BreadcrumbComponent
  ],
  templateUrl: './travel-requests.component.html',
  styleUrl: './travel-requests.component.scss'
})
export class TravelRequestsComponent implements OnInit {
  requestForm: FormGroup;
  loading = false;
  activePolicy: any;
  policyWarning = false;
  today = new Date();
  departments = ['HR', 'Finance', 'IT', 'Operations', 'Sales'];
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Travel Requests', icon: 'flight_takeoff', route: '/travel-request-list' },
    { label: 'New Request', icon: 'add_circle', isActive: true }
  ];

  constructor(
    private fb: FormBuilder,
    private travelService: TravelRequestService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.requestForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      purpose: ['', Validators.required],
      department: ['', Validators.required],
      travelClass: ['ECONOMY', Validators.required],
      estimatedBudget: [null, [Validators.required, Validators.min(1)]],
      additionalNotes: ['']
    });
  }

  ngOnInit(): void {
    // Load policy if needed
    this.loadPolicy();
  }
  loadPolicy() {
    this.http.get<any>(`${environment.apiUrl}/policies/active`).subscribe(p => {
      this.activePolicy = p;
    });
  }
  checkPolicy(): void {
    // Check if budget exceeds policy limits
    const budget = this.requestForm.get('estimatedBudget')?.value;
    if (this.activePolicy && budget > this.activePolicy.maxBudgetPerTrip) {
      this.policyWarning = true;
    } else {
      this.policyWarning = false;
    }
  }


  saveDraft(): void {
    if (this.requestForm.valid) {
      this.createRequest('DRAFT');
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }

  submitRequest(): void {
    if (this.requestForm.valid) {
      this.createRequest('PENDING_MANAGER');
    }
  }

  private createRequest(status: string): void {
    this.loading = true;
    const user = this.authService.getCurrentUser();
    const payload = {
      ...this.requestForm.value,
      employeeId: user.id,
      requesterRole: user.role,
      status: status
    };

    this.travelService.create(payload).subscribe({
      next: () => {
        this.snackBar.open(
          status === 'DRAFT' ? 'Draft saved successfully!' : 'Request submitted successfully!',
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(['/travel-request-list']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
}