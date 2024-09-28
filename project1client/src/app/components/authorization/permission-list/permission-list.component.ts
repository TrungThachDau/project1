import {Component, OnInit} from '@angular/core';
import {AuthorizationListSectionComponent} from "../authorization-list-section/authorization-list-section.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {AuthorizationService} from "../../../services/authorization.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    AuthorizationListSectionComponent,
    NavbarComponent,
    NgForOf
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
