import { Component ,OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  selectedUserId:number | null = null;
  isLoading = false;
  users: any[] = [];

  readonly departments = ['HR', 'Finance', 'IT', 'Operations', 'Sales', 'Marketing'];
  readonly roles = ['ADMIN', 'MANAGER', 'FINANCE', 'EMPLOYEE'];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private location: Location, private userService: UserService, private snackBar: MatSnackBar ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeeId: ['', Validators.required],
      department: [''],
      role: [''],
      phone: ['', [Validators.required, /* Validators.pattern('^[0-9]{10}$') */]],
      location: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ngOnInit() {
    // Get user data from navigation state using location.getState()
    const state = (this.location as any).getState();
    
    if (state?.user) {
      const user = state.user;
      this.isEditMode = true;
      this.selectedUserId = user.id;
      
      // Populate the form with existing user data
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        department: user.department,
        role: user.role,
        phone: user.phone || user.phoneno,
        location: user.location,
        password: ''
      });
      
      // Make password optional in edit mode (only minLength, no required)
      const passwordControl = this.userForm.get('password');
      if (passwordControl) {
        passwordControl.setValidators([Validators.minLength(6)]);
        passwordControl.updateValueAndValidity();
      }
    }
  }
  
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }  

    const data = this.userForm.value;

    data.enabled = true; // Add default enabled field

    console.log('Form Data:', data);

     if (this.isEditMode && this.selectedUserId) {
      // Update logic
      if (!data.password) delete data.password;
      this.userService.update(this.selectedUserId, data).subscribe({
        next: () => {
          this.snackBar.open('User updated!', 'Close', { duration: 3000 });
          this.gotoUserList();
        },
        error: (err) => {
          console.error('Update failed', err);
          this.snackBar.open('Update failed.', 'Close', { duration: 3000 });
        }
      });
    } else {
      // Create logic
      data.enabled = true; // Add default enabled field
      console.log('Creating user with data:', data);
      this.userService.create(data).subscribe({
        next: () => {
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
          this.gotoUserList();
        },
        error: (err) => {
        console.error('Creation failed', err);
          console.log(err.error);

          this.snackBar.open(
            err.error?.message || 'Creation failed.',
            'Close',
            { duration: 3000 }
          );
        }
      });
    } 
  }
  
  gotoUserList(){
    this.router.navigate(['/users'])
  }

}
