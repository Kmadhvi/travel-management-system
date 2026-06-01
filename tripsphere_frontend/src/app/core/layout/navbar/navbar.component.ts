import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive ,Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  constructor(public authService:AuthService, private router: Router){}
  @Output() toggleSidebar = new EventEmitter<void>();
  
 
 getInitials(): string {
    if (!this.getCurrentUser().name) return 'U';
    return this.getCurrentUser().name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  canViewUsersandSettings(): boolean {
    return this.authService.isManager() || this.authService.isAdmin() || this.authService.isFinance() ;
  }

  onToggle() {
    this.toggleSidebar.emit();
  }
  logout(){
     this.authService.logout();
    this.router.navigate(['/login']);
  }

}
