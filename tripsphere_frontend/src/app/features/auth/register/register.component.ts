import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

    constructor( private fb: FormBuilder ,private router: Router) {
        this.registerForm = this.fb.group({
          fullName:['',[Validators.required,Validators.pattern('/^[a-zA-Z]+ [a-zA-Z]+$/')]],
          email:['',[Validators.required,Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$')]],
          password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
          confirmPassword:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
        } ,{ validators:this.passwordMatchValidator });
  }

  onSubmit(){
    this.registerForm.get('fullName')?.value;
    console.log(this.registerForm.value);
  }
  
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch : true }
  }

}
