import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-resetpassword',
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormField,
        MatInputModule,
        MatLabel,
        RouterLink
    ],
    templateUrl: './resetpassword.component.html',
    styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  email: any;
  constructor(private authService: AuthService, private snackBar:MatSnackBar) {}
  resetPassword() {
    if(this.email){
      this.authService.resetPassword(this.email)
        .then(()=>{
          this.snackBar.open('Một email khôi phục vừa được gửi đến bạn.', 'Đóng', {
            duration: 3000,
          });
        })
    }
  }
}
