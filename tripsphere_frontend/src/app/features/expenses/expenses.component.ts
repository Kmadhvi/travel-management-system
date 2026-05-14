import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatCardModule ,MatButtonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {

  constructor(private router: Router) {}

  goToAddExpense() {
    console.log('Going to add expense');
    this.router.navigate(['/add-expense']);
  }
}
