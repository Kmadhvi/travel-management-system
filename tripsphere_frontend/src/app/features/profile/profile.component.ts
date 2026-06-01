import { Component, OnInit } from '@angular/core';
import { FormsModule ,FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { BreadcrumbComponent,  BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
import { ProfileService } from '../../core/services/profile.service';
import { MatSnackBar ,MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatSnackBarModule, RouterLink,
    BreadcrumbComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileData: any = {
    name: '', email: '', role: '', department: '',
    location: '', phone: '', employeeId: ''
  };
  isEditMode = false;
  isLoading = false;

  profileForm!: FormGroup;
    breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Profile', icon: 'person', route: '/' },
  ];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      department: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.profileForm.patchValue({
          name: data.name,
          phone: data.phone,
          department: data.department,
          location: data.location
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Error loading profile.', 'Close', { duration: 3000 });
      }
    });
  }

  toggleEdit() {
    if (this.isEditMode) {
      this.cancelEdit();
    } else {
      this.isEditMode = true;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profileForm.patchValue({
      name: this.profileData.name,
      phone: this.profileData.phone,
      department: this.profileData.department,
      location: this.profileData.location
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (updated: any) => {
        this.profileData = updated;
        const user = this.authService.getCurrentUser();
        if (user) {
          user.name = updated.name;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.isEditMode = false;
        this.isLoading = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000 });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully.', 'Close', { duration: 3000 });
    // Router redirect handled by AuthService or calling component
    window.location.href = '/login';
  }

  changePassword() {
    const newPass = prompt('Enter new password:');
    if (newPass && newPass.length >= 6) {
      this.profileService.changePassword({ newPassword: newPass }).subscribe({
        next: () => this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 }),
        error: () => this.snackBar.open('Failed to change password.', 'Close', { duration: 3000 })
      });
    } else if (newPass) {
      this.snackBar.open('Password must be at least 6 characters.', 'Close', { duration: 3000 });
    }
  }

  getInitials(): string {
    if (!this.profileData.name) return 'U';
    return this.profileData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
