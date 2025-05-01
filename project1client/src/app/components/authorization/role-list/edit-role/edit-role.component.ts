import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NavbarComponent} from "../../../navbar/navbar.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RoleService} from "../../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserListSectionComponent} from "../../../management/list-section/user-list-section.component";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
    selector: 'app-edit-role',
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        NavbarComponent,
        ReactiveFormsModule,
        UserListSectionComponent,
        MatToolbar
    ],
    templateUrl: './edit-role.component.html',
    styleUrl: './edit-role.component.scss'
})
export class EditRoleComponent implements OnInit {
  id!: string;
  editRoleForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });
  constructor(private roleService: RoleService,private route: ActivatedRoute,private router: Router) { }
  ngOnInit() {
    this.loadRole();
  }

  loadRole(){
    this.id = this.route.snapshot.params['id_role'];
    this.roleService.getRoleById(this.id).subscribe((data: any) => {
      this.editRoleForm.setValue({
        name: data.name_role,
        description: null
      });
    }
    );
  }

  updateRole() {
    const data = {
      id_role: this.id,
      name_role: this.editRoleForm.value.name
    };
    this.roleService.putRole(this.id, data).subscribe((response: any) => {
      this.router.navigate(['/authorization/role-list']);
    });

  }
}
