import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatActionList } from "@angular/material/list";
import { BreadcrumbComponent,BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatActionList,BreadcrumbComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', route: '/dashboard' },
    { label: 'Expenses', icon: 'payments', isActive: true }
  ];
  constructor(private router: Router) {}

  goToAddExpense() {
    console.log('Going to add expense');
    this.router.navigate(['/add-expense']);
  }
}
