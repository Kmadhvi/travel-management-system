import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbComponent,BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [   MatCardModule,
    MatFormFieldModule,
    MatSelectModule,BreadcrumbComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Home', icon: 'home', route: '/dashboard' },
      { label: 'Reports', icon: 'assessment', isActive: true }
    ];

}
