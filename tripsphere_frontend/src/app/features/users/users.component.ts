import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  isLoading = false;
  users: any[] = [];
  filteredUsers: any[] = [];
  isEditMode = false;
  searchTerm = '';
  selectedRole = 'ALL';
  readonly roles = ['ALL', 'ADMIN', 'MANAGER', 'FINANCE', 'EMPLOYEE'];  
  readonly departments = ['HR', 'Finance', 'IT', 'Operations', 'Sales', 'Marketing'];
  constructor (private router:Router , private userService: UserService, private snackBar: MatSnackBar){}

  ngOnInit() {
    this.loadUsers();
  }

  gotoAddUser(){
    this.router.navigate(['/add-user'])
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Error loading users.', 'Close', { duration: 3000 });
      }
    });
  }
  applyFilter() {
    let result = [...this.users];
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(u =>
        u.name?.toLowerCase().includes(term) || 
        u.email?.toLowerCase().includes(term) ||
        u.employeeId?.toLowerCase().includes(term)
      );
    }
    if (this.selectedRole !== 'ALL') {
      result = result.filter(u => u.role === this.selectedRole);
    }
    this.filteredUsers = result;
  }
  openEditModal(user: any) {
      this.isEditMode = true;
      this.router.navigate(['/add-user'], { state: { user } });
  }
  
  deleteUser(id: number) {
    if(confirm('Are you sure you want to delete this user?')) {
       this.userService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('User deleted.', 'Close', { duration: 3000 });
            this.loadUsers();
          },
          error: () => this.snackBar.open('Delete failed.', 'Close', { duration: 3000 })
        });
      }
  }
}


