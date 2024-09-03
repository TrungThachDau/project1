import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-resetpassword',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatFormField,
        MatInput,
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
        .then((result:any)=>{
          this.snackBar.open('Một email khôi phục vừa được gửi đến bạn.', 'Đóng', {
            duration: 3000,
          });
        })
    }
  }
}
