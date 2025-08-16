import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";

import {RouterLink} from "@angular/router";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RoleService} from "../../../../services/role.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserListSectionComponent} from "../../../management/list-section/user-list-section.component";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
    selector: 'app-add-role',
    imports: [
    NavbarComponent,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    UserListSectionComponent,
    MatToolbarModule
],
    templateUrl: './add-role.component.html',
    styleUrl: './add-role.component.scss'
})
export class AddRoleComponent implements OnInit{
  addRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })

  constructor(private roleService:RoleService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async addRole() {
    const data = {
      name_role: this.addRoleForm.get('name')?.value,
      description: this.addRoleForm.get('description')?.value
    };
    try {
      const result = await this.roleService.postRole(data).toPromise();
      this.snackBar.open('Role added successfully', 'Close', {
        duration: 2000
      });
      console.log(result);
    } catch (error) {
      this.snackBar.open('Failed to add role', 'Close', {
        duration: 2000
      });
      console.log(error);
    }
  }

}
