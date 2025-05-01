import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {RoleService} from "../../../../services/role.service";
import {AuthService} from "../../../../services/auth.service";
import {
  MatDialog,
  MatDialogModule
} from "@angular/material/dialog";
import {DialogAddUserSuccessfulComponent} from "./dialog-add-user-successful/dialog-add-user-successful.component";
import { UserService } from '../../../../services/user.service';
import {RouterLink} from "@angular/router";
import {SpinnerService} from "../../../../services/spinner.service";

@Component({
    selector: 'app-add-user',
    imports: [
        NavbarComponent,
        UserListSectionComponent,
        MatFormField,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatLabel,
        CommonModule,
        ReactiveFormsModule,
        MatError,
        MatOption,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        RouterLink
    ],
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl('', [Validators.required])

  });
  roles: any[] = [];
  password = this.generatePassword();


  constructor(private userService: UserService,private authService: AuthService, private roleService: RoleService,public dialog: MatDialog, private spinerService: SpinnerService) {
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
      this.spinerService.show('Đang thêm...');
      // Gọi API đăng ký với authService
      const email = this.addUserForm.value.email as string;
      const response = await this.authService.signUp(email, this.password);
      console.log('User created successfully:', response.user.uid);
      const userData = {
        id_user: response.user.uid,
        name: this.addUserForm.value.name,
        email: this.addUserForm.value.email,
        phone: this.addUserForm.value.phone,
        address: this.addUserForm.value.address,
        id_role: this.addUserForm.value.role
      };

      // Gửi dữ liệu người dùng tới server
      this.userService.postUser(userData).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.spinerService.hide();
          // Mở dialog khi đăng ký thành công
          this.dialog.open(DialogAddUserSuccessfulComponent, {
            data: { username: this.addUserForm.value.email, password: this.password } // Chỉ gửi thông tin không nhạy cảm
          });
        },
        error: (error) => {
          this.spinerService.hide();
          console.error('Error creating user:', error);
          // Hiển thị thông báo lỗi cho người dùng, ví dụ:
          // this.snackBar.open('Error creating user', 'Close', { duration: 3000 });
        }
      });
    } catch (e) {
      this.spinerService.hide();
      // Xử lý lỗi nếu có và thông báo cho người dùng
      console.error('Đăng ký thất bại:', e);
      // Hiển thị thông báo lỗi cho người dùng, ví dụ:
      // this.snackBar.open('Đăng ký thất bại, vui lòng thử lại', 'Close', { duration: 3000 });
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

