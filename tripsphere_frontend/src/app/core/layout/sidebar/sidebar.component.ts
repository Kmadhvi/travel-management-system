import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Constant } from '../../../constant/constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = true;

  role = localStorage.getItem('role') || 'EMPLOYEE';

  loggedUserdata: any = {};
  menuList: any[] = [];

  constructor() {
    const localData = localStorage.getItem('loggedUser');
    if (localData !== null) {
      this.loggedUserdata = JSON.parse(localData);
      const allmenuItems = Constant.Menu_Items;
      this.menuList = allmenuItems.filter(m => m.allowedRoles.includes(this.loggedUserdata.role));
    }
  }
}
