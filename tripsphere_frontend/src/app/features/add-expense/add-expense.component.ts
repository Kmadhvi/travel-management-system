import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    BreadcrumbComponent
],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  expenseForm: FormGroup;
  selectedFileName = '';

  requestDetails: any = null;

   breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Expenses', icon: 'payments', route: '/expenses' },
    { label: 'New Expense', icon: 'receipt', isActive: true }
  ];

  requestsData: any[] = [
    {
      id: 'TR001',
      destination: 'Mumbai',
      dates: '12 Apr - 15 Apr',
      department: 'Finance'
    },
    {
      id: 'TR002',
      destination: 'Delhi',
      dates: '18 Apr - 20 Apr',
      department: 'HR'
    },
    {
      id: 'TR003',
      destination: 'Bangalore',
      dates: '22 Apr - 24 Apr',
      department: 'IT'
    }
  ];


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.expenseForm = this.fb.group({
      requestId: ['', [Validators.required]],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      receipt: [null, Validators.required]

    });

  }
  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id');

    if (requestId) {
      // Set form value
      this.expenseForm.patchValue({
        requestId: requestId
      });

      // Find matching request
      this.requestDetails = this.requestsData.find(
        (req) => req.id === requestId
      );
    }
  }

  get f() {
    return this.expenseForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file) {
      this.selectedFileName = file.name;
      this.expenseForm.patchValue({ receipt: file });
      this.expenseForm.get('receipt')?.markAsTouched();
      this.expenseForm.get('receipt')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    console.log('Expense Form Data:', this.expenseForm.value);
    this.router.navigate(['/expenses']);
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }
}
