import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {UserListSectionComponent} from "../list-section/user-list-section.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NavbarComponent,
    UserListSectionComponent,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
