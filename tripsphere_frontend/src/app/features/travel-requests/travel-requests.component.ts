import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-travel-requests',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './travel-requests.component.html',
  styleUrl: './travel-requests.component.scss'
})
export class TravelRequestsComponent {
destination = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  purpose = '';
  budget: number | null = null;
  department = '';
  travelClass = '';

  saveDraft() {
    console.log('Draft Saved', {
      destination: this.destination,
      startDate: this.startDate,
      endDate: this.endDate,
      purpose: this.purpose,
      budget: this.budget,
      department: this.department,
      travelClass: this.travelClass
    });
  }

  submitRequest() {
    console.log('Request Submitted', {
      destination: this.destination,
      startDate: this.startDate,
      endDate: this.endDate,
      purpose: this.purpose,
      budget: this.budget,
      department: this.department,
      travelClass: this.travelClass
    });
  }
}
