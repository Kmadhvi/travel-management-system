import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { PolicyService } from '../../core/services/policy.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule ,MatSnackBar} from '@angular/material/snack-bar';

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
    ReactiveFormsModule,
    CommonModule,
    BreadcrumbComponent,
    MatSnackBarModule
  ],
  templateUrl: './policy-management.component.html',
  styleUrl: './policy-management.component.scss'
})
export class PolicyManagementComponent implements OnInit {
  isAdmin = false;
  policyForm: FormGroup;
  policy: any;
  loading = false;
  saving = false;
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Policy Management', icon: 'policy', isActive: true }
  ];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private policyService: PolicyService,
    private snackBar: MatSnackBar
  ) {
    this.policyForm = this.fb.group({
      policyName: ['', Validators.required],
      maxBudgetPerTrip: [0, [Validators.required, Validators.min(0)]],
      maxHotelPerNight: [0, [Validators.required, Validators.min(0)]],
      maxDailyFoodExpense: [0, [Validators.required, Validators.min(0)]],
      budgetLimit: [0, [Validators.required, Validators.min(0)]],
      allowedTravelClass: ['ECONOMY', Validators.required],
      maxBookingDays: [30, [Validators.required, Validators.min(1)]],
      receiptMandatory: [true],
      foodClaimLimit: [0, [Validators.required, Validators.min(0)]],
      transportClaimLimit: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadPolicy();
  }

  loadPolicy(): void {
    this.loading = true;
    this.policyService.getActivePolicy().subscribe({
      next: (data) => {
        this.policy = data;
        this.policyForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading policy:', err);
        this.snackBar.open('Failed to load policy. Please try again.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  savePolicy(): void {
    if (!this.isAdmin) {
      this.snackBar.open('Only admins can save policies.', 'Close', { duration: 3000 });
      return;
    }

    if (this.policyForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 3000 });
      return;
    }

    this.saving = true;
    const policyData = this.policyForm.value;

    if (this.policy && this.policy.id) {
      // Update existing policy
      this.policyService.updatePolicy(this.policy.id, policyData).subscribe({
        next: () => {
          this.snackBar.open('Policy updated successfully!', 'Close', { duration: 3000 });
          this.loadPolicy();
          this.saving = false;
        },
        error: (err) => {
          console.error('Error updating policy:', err);
          this.snackBar.open('Failed to update policy. Please try again.', 'Close', { duration: 3000 });
          this.saving = false;
        }
      });
    } else {
      // Create new policy
      this.policyService.createPolicy(policyData).subscribe({
        next: () => {
          this.snackBar.open('Policy created successfully!', 'Close', { duration: 3000 });
          this.loadPolicy();
          this.saving = false;
        },
        error: (err) => {
          console.error('Error creating policy:', err);
          this.snackBar.open('Failed to create policy. Please try again.', 'Close', { duration: 3000 });
          this.saving = false;
        }
      });
    }
  }
}
