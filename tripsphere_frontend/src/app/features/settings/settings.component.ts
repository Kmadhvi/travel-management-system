import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [  CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

   settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      companyName: ['TripSphere Pvt Ltd'],
      currency: ['INR'],
      dateFormat: ['DD/MM/YYYY'],
      timezone: ['Asia/Kolkata'],

      defaultTravelClass: ['Economy'],
      maxTripDuration: ['10'],
      advanceBookingDays: ['7'],

      managerApproval: [true],
      financeApproval: [true],
      multiLevelApproval: [true],

      maxReimbursementAmount: ['50000'],
      receiptMandatory: [true],

      approvalEmailNotification: [true],
      rejectionEmailNotification: [true],
      expenseReminderNotification: [false]
    });
  }

  onSave(): void {
    console.log('Settings Saved:', this.settingsForm.value);
  }

}
