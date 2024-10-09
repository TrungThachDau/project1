import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {RoleService} from "../../../../services/role.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserListSectionComponent} from "../../../management/list-section/user-list-section.component";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-add-role',
  standalone: true,
    imports: [
        NavbarComponent,
        NgForOf,
        RouterLink,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        ReactiveFormsModule,
        UserListSectionComponent,
        MatToolbar
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
