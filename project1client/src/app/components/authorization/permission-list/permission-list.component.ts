import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {AuthorizationService} from "../../../services/authorization.service";
import {NgForOf} from "@angular/common";
import {UserListSectionComponent} from "../../management/list-section/user-list-section.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    UserListSectionComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent implements OnInit {
  permissions:any[] = [];
  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getAllPermission().subscribe(data => {
        //Load len table
        this.permissions= data;
      },
      error => {
        console.log(error);
      });
  }

}
