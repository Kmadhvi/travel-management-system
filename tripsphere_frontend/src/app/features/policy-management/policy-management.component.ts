import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-policy-management',
  standalone: true,
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    BreadcrumbComponent
  ],
  templateUrl: './policy-management.component.html',
  styleUrl: './policy-management.component.scss'
})
export class PolicyManagementComponent implements OnInit {
  isAdmin = false;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Policy Management', icon: 'policy', isActive: true }
  ];

  policy = {
    budgetLimit: 50000,
    allowedTravelClass: 'Economy / Business',
    maxBookingDays: 30,
    receiptMandatory: true,
    foodClaimLimit: 2500,
    transportClaimLimit: 5000
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  savePolicy(): void {
    console.log('Policy saved:', this.policy);
    // TODO: Add API call to save policy
  }
}
