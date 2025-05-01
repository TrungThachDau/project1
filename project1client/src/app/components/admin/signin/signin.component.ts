import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import {EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";


@Component({
    selector: 'app-signin',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLink,
        FormsModule,
        MatProgressSpinnerModule,
        NgIf
    ],
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
  });

  constructor(private authService : AuthService,private snackBar: MatSnackBar,private router : Router) {}  // Khởi tạo authService
  isLoading =false;

  ngOnInit() {
    const token = sessionStorage.getItem('authToken');
    // Hoặc kiểm tra trong localStorage
    // const token = localStorage.getItem('authToken');

    if (token) {
      // Nếu có session, chuyển hướng về dashboard
      this.router.navigate(['/dashboard']);
    }
  }
  // async signIn() {
  //   this.isLoading = true;
  //   if (!this.signInForm.value.email || !this.signInForm.value.password) {
  //     this.handleError('Vui lòng nhập đầy đủ thông tin');
  //     return;
  //   }

  //   try {
  //     const result: any = await this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
  //     const IdToken = result.user.accessToken;

  //     try {
  //       const response: any = await this.authService.verifyToken(IdToken).toPromise();
  //       if (response.uid) {

  //         sessionStorage.setItem('authToken', IdToken);
  //         sessionStorage.setItem('uid', response.uid);
  //         //Lay quyen luu vao session
  //         const permission: any = await this.authService.getPermission(response.uid).toPromise();
  //         if (permission) {
  //           try {
  //             this.isLoading = false;
  //             sessionStorage.setItem('permissions', JSON.stringify(permission));
  //             console.log(sessionStorage.getItem('permissions'));
  //           } catch (error) {
  //             console.error(error);
  //           }
  //         }
  //         //Update last login sau do chuyen ve dashboard
  //         try {
  //           await this.authService.updateLastLogin(response.uid).toPromise();
  //           this.router.navigate(['/dashboard']);
  //         } catch (error) {
  //           console.error(error);
  //           this.isLoading = false;
  //           this.handleError('Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
  //         }
  //       } else {
  //         this.isLoading = false;
  //         this.handleError('Token không hợp lệ');
  //       }
  //     } catch (verifyError) {
  //       this.isLoading = false;
  //       console.error('Error verifying token:', verifyError);
  //       this.handleError('Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
  //     }
  //   } catch (loginError:any) {
  //     this.isLoading = false;
  //     console.error('Login error:', loginError);
  //     this.handleError('Đăng nhập thất bại: '+loginError.code);
  //   }
  // }
  async signIn() {
  this.isLoading = true;
  if (!this.signInForm.value.email || !this.signInForm.value.password) {
    this.handleError('Vui lòng nhập đầy đủ thông tin');
    this.isLoading = false;
    return;
  }

  try {
    const result: any = await this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
    const IdToken = result.user.accessToken;
    const response: any = await this.authService.verifyToken(IdToken).toPromise();

    if (response.uid) {
      sessionStorage.setItem('authToken', IdToken);
      sessionStorage.setItem('uid', response.uid);

      const permission: any = await this.authService.getPermission(response.uid).toPromise();
      if (permission) {
        sessionStorage.setItem('permissions', JSON.stringify(permission));
        console.log(sessionStorage.getItem('permissions'));
      }

      await this.authService.updateLastLogin(response.uid).toPromise();
      this.router.navigate(['/dashboard']);
    } else {
      this.handleError('Token không hợp lệ');
    }
  } catch (error) {
    console.error('Error:', error);
    this.handleError('Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
  } finally {
    this.isLoading = false;
  }
}
  private handleError(message: string) {
    this.snackBar.open(message, 'Đóng', { duration: 3000 });
  }


}
