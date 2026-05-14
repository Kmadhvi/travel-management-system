import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {Router } from '@angular/router';



@Component({
  selector: 'app-travel-request-list',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule],
  templateUrl: './travel-request-list.component.html',
  styleUrl: './travel-request-list.component.scss'
})
export class TravelRequestListComponent {

  constructor (private router:Router ){}

  viewRequestDetails(requestId: string) {
    this.router.navigate(['/request-details', requestId]);
  }

 
}
