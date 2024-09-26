import { Component} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [NavbarComponent, MatFormField, MatInput, MatLabel, FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])

  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  async changePassword(): Promise<void> {
    const oldPassword = this.changePasswordForm.value.oldPassword as string;
    const newPassword = this.changePasswordForm.value.newPassword as string;
    try {
      await this.authService.changePassword(oldPassword,newPassword);
      const snackBarRef = this.snackBar.open('Mật khẩu đã được thay đổi thành công! Vui lòng đăng nhập lại.', 'Đóng',);
      snackBarRef.onAction().subscribe(() => {
        this.authService.signOut();
        this.router.navigate(['/signIn']);
      });

    } catch (error:any) {
      this.snackBar.open('Đã xảy ra lỗi khi đổi mật khẩu: ' + error.code, 'Đóng',);
    }
  }
}
