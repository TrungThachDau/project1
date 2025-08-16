import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../services/role.service";
import {
  DialogAddUserSuccessfulComponent
} from "../add-user/dialog-add-user-successful/dialog-add-user-successful.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-edit-user',
    imports: [
    NavbarComponent,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    UserListSectionComponent
],
    templateUrl: './edit-user.component.html',
    styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  id!: string;
  roleValue!: string;
  roles: any[] = [];
  uid: string | null= sessionStorage.getItem('uid');
  editUserForm = new FormGroup({
    id_user: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl({ value: '', readOnly: true }, [Validators.required]), // Khởi tạo với trạng thái disabled

  });
  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router,private roleService: RoleService,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadRoles();
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.roleValue = data.id_role;

      this.editUserForm.setValue({
        id_user: data.id_user,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        role: data.id_role
      });
    });
    this.getPermissionById(sessionStorage.getItem('uid')!);
  }
  private loadRoles() {
    this.roleService.getAll().subscribe(data => {
        this.roles = data;
      },
      error => {
        console.log(error);
      })
  }

  editUser() {
    const userData = {
      id_user: this.editUserForm.value.id_user,
      name: this.editUserForm.value.name,
      email: this.editUserForm.value.email,
      phone: this.editUserForm.value.phone,
      address: this.editUserForm.value.address,
      id_role: this.editUserForm.value.role||this.roleValue,
      role:null,
    };

    this.userService.putUser(this.id,userData).subscribe({
      next: () => {
        this.snackBar.open("Cập nhật thành công.", 'Đóng', { duration: 3000 });
      },
      error: error => {
        this.snackBar.open("Đã xảy ra lỗi. Vui lòng thử lại.", 'Đóng', { duration: 3000 });
        console.log(error);
      }
    });

  }
  getPermissionById(id: string) {
    this.userService.getUserById(id).subscribe((data: any) => {
      const userRole = data.id_role;
      const user = data.id_user;
      if(userRole==1) {
        this.editUserForm.get('role')?.enable();
      }
      if(user==this.route.snapshot.params['id'])
      {
        alert("Bạn không thể sửa quyền chính mình.");
        this.editUserForm.get('role')?.disable();
      }
    });
  }
}
