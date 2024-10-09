import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {signOut} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import { MatSidenavContainer } from '@angular/material/sidenav';
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenu, MatMenuTrigger, MatMenuItem, MatSidenavModule, MatSidenavContainer, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  permissions: string[] = [];
  navButton = [

    { name: 'Quản lý', permission: 'USER_MANAGEMENT', path: '/management' },
    {name: 'Quản lý vật tư', permission: 'ITEM_MANAGEMENT', path: '/material-management'},
    {name: 'Dự án', permission: 'PROJECT_PROCESSING', path: '/project-management'},
    {name: 'Phân tích chi phí', permission: 'COST_ANALYSIS', path: '/cost_analysis'},
  ];

  constructor(private authService: AuthService, private router: Router) {
    const storedPermissions = sessionStorage.getItem('permissions');

    if (storedPermissions) {
      // Chuyển đổi chuỗi JSON thành mảng nếu tồn tại
      this.permissions = JSON.parse(storedPermissions);
    }
  }


  // Hàm đăng xuất
  signOut() {
    this.authService.signOut();
    this.router.navigate(['/signIn']);
  }

  // Hàm kiểm tra quyền
  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}

