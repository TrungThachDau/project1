import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserListSectionComponent} from "../user-list-section/user-list-section.component";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../services/role.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
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
    NgForOf,
    ReactiveFormsModule,
    UserListSectionComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  id!: string;
  roles: any[] = [];
  editUserForm = new FormGroup({
    id_user: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl('', [Validators.required])

  });
  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router,private roleService: RoleService) { }

  ngOnInit(): void {
    this.loadRoles();
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.editUserForm.setValue({
        id_user: data.id_user,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        role: data.id_role
      });
    });
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
      id_role: this.editUserForm.value.role,
      role:null,
    };

    this.userService.putUser(this.id,userData).subscribe(res => {
      this.router.navigate(['/all-user']);
    });
  }
}
