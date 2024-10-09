import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {AuthorizationService} from "../../../services/authorization.service";
import {NgForOf} from "@angular/common";
import {UserListSectionComponent} from "../../management/list-section/user-list-section.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    UserListSectionComponent,
    MatButton,
    RouterLink,
    MatToolbar,
    ReactiveFormsModule
  ],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent implements OnInit {
  permissions:any[] = [];
  filteredPermissions:any[] = [];
  search = new FormControl('');
  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getAllPermission().subscribe(data => {
        //Load len table
        this.permissions= data;
        this.filteredPermissions = this.permissions;
      },
      error => {
        console.log(error);
      });
    this.search.valueChanges.subscribe(searchTerm => {
      this.filteredPermissions = this.filterPermission(searchTerm);

    }
    );
  }

  filterPermission(searchTerm: string | null): any[] {
    if (!searchTerm) {
      return this.permissions;
    }
    return this.permissions.filter(permission =>
      permission.permission_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
