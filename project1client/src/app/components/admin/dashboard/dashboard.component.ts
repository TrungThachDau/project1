import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    imports: [
        NavbarComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    // Hoặc kiểm tra trong localStorage
    // const token = localStorage.getItem('authToken');

    if (!token) {
      // Nếu không có session, chuyển hướng về trang đăng nhập
      this.router.navigate(['/signIn']);
    }
  }
  singOut(){
    this.authService.signOut();
    this.router.navigate(['/signIn']);
  }
}
