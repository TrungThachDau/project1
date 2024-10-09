import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {UserListSectionComponent} from "../list-section/user-list-section.component";
import {MatToolbar} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NavbarComponent,
    UserListSectionComponent,
    MatToolbar,
    FormsModule,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    NgForOf,
    RouterLink,
    MatMenuTrigger
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
