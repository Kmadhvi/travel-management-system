import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-policy-management',
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './policy-management.component.html',
  styleUrl: './policy-management.component.scss'
})
export class PolicyManagementComponent {

}
