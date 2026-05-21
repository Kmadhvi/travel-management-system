import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  
 user = {
    name: 'Madhvi Desai',
    role: 'Admin',
    department: 'IT',
    email: 'madhvi@gmail.com',
    phone: '+91 9876543210',
    employeeId: 'EMP001',
    location: 'Ahmedabad, India',
    joinedOn: '12 Jan 2026'
  };
}
