import {Component, OnInit} from '@angular/core';
import {AuthorizationListSectionComponent} from "../authorization-list-section/authorization-list-section.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    AuthorizationListSectionComponent,
    NavbarComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit{
  roles:any[] = [];
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getAll().subscribe(data => {
        //Load len table
        this.roles = data;
      },
      error => {
        console.log(error);
      });
  }

}
