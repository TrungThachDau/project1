import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {NavbarComponent} from "../../../navbar/navbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-detail-project',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    NavbarComponent,
    UserListSectionComponent,
    MatToolbarModule,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,


  ],
  templateUrl: './detail-project.component.html',
  styleUrl: './detail-project.component.scss'
})
export class DetailProjectComponent {

}
