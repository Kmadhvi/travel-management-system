import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { TravelRequestService } from '../../core/services/travel-request.service';
import { BreadcrumbComponent,BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,BreadcrumbComponent],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss'
})
export class ApprovalsComponent {
  approvals: any[] = [];
  isLoading = false;
  currentUser: any;
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Approvals', icon: 'approval', isActive: true }
  ];

  constructor(
    private travelRequestService: TravelRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadApprovals();
  }

  loadApprovals(): void {
    this.isLoading = true;
    const role = this.currentUser.role;

    if (role === 'MANAGER' || role === 'ADMIN') {
      // Manager/Admin sees PENDING_MANAGER requests
      this.travelRequestService.getByStatus('PENDING_MANAGER').subscribe({
        next: (data) => { this.approvals = data; this.isLoading = false; },
        error: () => this.isLoading = false
      });
    } else if (role === 'FINANCE') {
      // Finance sees PENDING_FINANCE requests
      this.travelRequestService.getByStatus('PENDING_FINANCE').subscribe({
        next: (data) => { this.approvals = data; this.isLoading = false; },
        error: () => this.isLoading = false
      });
    } else {
      this.isLoading = false;
    }
  }

  getStatusClass(status: string) {
    return 'status-' + status.toLowerCase();
  }

}
