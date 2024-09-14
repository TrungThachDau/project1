import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule, } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  constructor(private authService : AuthService,private snackBar: MatSnackBar,private router : Router) {}  // Khởi tạo authService
  email: string='';
  password: string='';
  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    // Hoặc kiểm tra trong localStorage
    // const token = localStorage.getItem('authToken');

    if (token) {
      // Nếu có session, chuyển hướng về dashboard
      this.router.navigate(['/dashboard']);
    }
  }
  async signIn() {
    if (!this.email || !this.password) {
      this.handleError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const result: any = await this.authService.signIn(this.email, this.password);
      const IdToken = result.user.accessToken;

      try {
        const response: any = await this.authService.verifyToken(IdToken).toPromise();
        if (response.uid) {
          sessionStorage.setItem('authToken', IdToken);
          sessionStorage.setItem('uid', response.uid);
          //Lay quyen luu vao session
          const permission: any = await this.authService.getPermission(response.uid).toPromise();
          if (permission) {
            try {

              sessionStorage.setItem('permissions', JSON.stringify(permission));
              console.log(sessionStorage.getItem('permissions'));
            } catch (error) {
              console.error(error);
            }
          }
          this.router.navigate(['/dashboard']);
        } else {
          this.handleError('Token không hợp lệ');
        }
      } catch (verifyError) {
        console.error('Error verifying token:', verifyError);
        this.handleError('Không thể kết nối với server. Vui lòng thử lại sau.');
      }
    } catch (loginError) {
      console.error('Login error:', loginError);
      this.handleError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  }

  private handleError(message: string) {
    this.snackBar.open(message, 'Đóng', { duration: 3000 });
  }


}
