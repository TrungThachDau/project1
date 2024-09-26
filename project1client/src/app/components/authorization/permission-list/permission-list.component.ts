import { Component } from '@angular/core';
import {AuthorizationListSectionComponent} from "../authorization-list-section/authorization-list-section.component";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    AuthorizationListSectionComponent,
    NavbarComponent
  ],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent {

}
