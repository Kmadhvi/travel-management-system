import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    BreadcrumbComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isEditing = false;
  isAdmin = false;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Profile', icon: 'person', isActive: true }
  ];

  user = {
    name: 'Madhvi Desai',
    role: 'Admin',
    department: 'IT',
    email: 'madhvi@gmail.com',
    phone: '+91 9876543210',
    employeeId: 'EMP001',
    location: 'Ahmedabad, India',
    joinedOn: '12 Jan 2026'
  };

  editableUser = { ...this.user };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  toggleEdit(): void {
    if (!this.isAdmin) return;
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editableUser = { ...this.user };
    }
  }

  saveProfile(): void {
    if (this.isAdmin) {
      this.user = { ...this.editableUser };
      this.isEditing = false;
      console.log('Profile saved:', this.user);
      // TODO: Add API call to save profile
    }
  }

  cancelEdit(): void {
    this.editableUser = { ...this.user };
    this.isEditing = false;
  }
}
