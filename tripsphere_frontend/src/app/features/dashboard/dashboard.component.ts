import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb.component';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, BreadcrumbComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService , private router: Router) {}

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home', isActive: true }
  ];
  gotoCreateReq(){
    return this.router.navigate(['/travel-request']);
  }
  gotoSubmitExpense(){
    return this.router.navigate(['/add-expense']);
  }
  gotoCheckStatus(){
    return this.router.navigate(['/travel-request-list']);
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
