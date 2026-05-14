import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, RouterLink, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private authService: AuthService,
              private snackBar : MatSnackBar
            ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () =>{
          this.snackBar.open('Login Successful! ','Close',{duration: 3000});
          this.router.navigate(['/dashboard']);
        },
        error:(err)=>{
          this.loading = false;
          this.snackBar.open('Invalid email or password','Close',{duration: 3000});
        }
      });

    }
  }




}

