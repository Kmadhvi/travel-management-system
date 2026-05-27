import { Component,OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {Router } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
import { A11yModule } from "@angular/cdk/a11y";
import { TravelRequestService } from '../../core/services/travel-request.service';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-travel-request-list',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, BreadcrumbComponent, A11yModule],
  templateUrl: './travel-request-list.component.html',
  styleUrl: './travel-request-list.component.scss'
})
export class TravelRequestListComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterStatus = 'ALL';
  isLoading = false;
  displayedColumns = ['requestNumber', 'destination', 'startDate', 'endDate', 'estimatedBudget', 'status', 'actions'];
  readonly statusOptions = [
    { value: 'ALL', label: 'All Requests' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'PENDING_MANAGER', label: 'Pending Manager' },
    { value: 'PENDING_FINANCE', label: 'Pending Finance' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'REJECTED', label: 'Rejected' }
  ];

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Travel Requests', icon: 'airplane', isActive: true }
  ];

  constructor (private router:Router ,
    public authService: AuthService,
    private travelService: TravelRequestService,
    private snackBar: MatSnackBar
  ){}

  viewRequestDetails(requestId: string) {
    this.router.navigate(['/request-details', requestId]);
  }
  
  newRequest() {
    this.router.navigate(['/travel-request']);
  }

  ngOnInit() {
     this.loadRequests();
  }
  
  isEmployee() { return this.authService.getCurrentUser()?.role === 'EMPLOYEE'; }
  isAdmin() { return this.authService.getCurrentUser()?.role === 'ADMIN'; }
  isManager() { return this.authService.getCurrentUser()?.role === 'MANAGER'; }

  loadRequests() {
    this.isLoading = true;
    const user = this.authService.getCurrentUser();
    const request$ = this.isEmployee()
      ? this.travelService.getByEmployee(user.id) : this.travelService.getAll();

    request$.subscribe({
      next: (data) => {
        this.requests = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter() {
    if (this.filterStatus === 'ALL') {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(r => r.status === this.filterStatus);
    }
  }
  viewDetails(id: number) {
    this.router.navigate(['/request-details', id]);
  }

  getStatusClass(status: string) {
    return 'status-chip status-' + status?.toLowerCase();
  }

  getStatusLabel(status: string) {
     return status?.replace(/_/g, ' ')?.toLowerCase()?.replace(/\b\w/g, char => char.toUpperCase()) || status;
  }

   canCreateRequest(): boolean {
    return this.authService.isEmployee() || this.authService.isManager();
  }
}