import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {UserListSectionComponent} from "../user-list-section/user-list-section.component";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {RoleService} from "../../../../services/role.service";
import {AuthService} from "../../../../services/auth.service";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {DialogAddUserSuccessfulComponent} from "./dialog-add-user-successful/dialog-add-user-successful.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    NavbarComponent,
    UserListSectionComponent,
    MatFormField,
    MatIcon,
    FormsModule,
    MatInput,
    MatIconButton,
    MatIconModule,
    MatLabel,
    CommonModule,
    ReactiveFormsModule,
    MatError,
    MatOption,
    MatSelectModule,
    MatFormFieldModule,
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  selectedValue: any;
  roles: any[] = []
  email: string = '';
  phone: string = '';
  address: string = '';
  name: string = '';
  password = this.generatePassword();

  constructor(private authService: AuthService, private roleService: RoleService,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles() {
    this.roleService.getAll().subscribe(data => {
        this.roles = data;
      },
      error => {
        console.log(error);
      })
  }

  async addUser() {
    try {
      // Gọi API đăng ký với authService
      await this.authService.signUp(this.email, this.password);
  
      // Mở dialog khi đăng ký thành công
      this.dialog.open(DialogAddUserSuccessfulComponent, {
        data: { username: this.email } // Chỉ gửi thông tin không nhạy cảm
      });
    } catch (e) {
      // Xử lý lỗi nếu có và thông báo cho người dùng
      console.error('Đăng ký thất bại:', e);
      // Hiển thị thông báo lỗi cho người dùng, ví dụ:
      ;
    }
  }
  


  private generatePassword() {
    const length = 8;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

