import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggle() {
    this.toggleSidebar.emit();
  }
}
