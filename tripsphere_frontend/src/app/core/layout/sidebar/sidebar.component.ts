import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = true;

  loggedUserdata: any = {};
  menuList: any[] = [];

  constructor(private router: Router, public authService: AuthService) {
    const localData = localStorage.getItem('currentUser');
    if (localData !== null) {
      this.loggedUserdata = JSON.parse(localData);
    }
  }

  // Menu visibility methods
  canViewUsers(): boolean {
    return this.authService.isAdmin();
  }

  canViewTravelRequest(): boolean {
    return this.authService.isEmployee() || this.authService.isManager() ;
  }

  canViewApprovals(): boolean {
    return this.authService.isManager() || this.authService.isAdmin() || this.authService.isFinance();
  }

  canViewReports(): boolean {
    return this.authService.isManager() || this.authService.isAdmin() || this.authService.isFinance();
  }

  canViewAuditLogs(): boolean {
    return this.authService.isAdmin() || this.authService.isFinance();
  }

  canViewPolicies(): boolean {
    return this.authService.isAdmin() || this.authService.isFinance();
  }

  canViewSettings(): boolean {
    return this.authService.isAdmin() || this.authService.isManager() || this.authService.isFinance();
  }

  getTripsLabel(): string {
    return this.authService.isEmployee() ? 'My Trips' : 'All Trips';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
