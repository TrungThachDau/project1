import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {UserListSectionComponent} from "../list-section/user-list-section.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

import {RouterLink} from "@angular/router";
import {AddProjectComponent} from "./add-project/add-project.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-project',
    imports: [
    NavbarComponent,
    UserListSectionComponent,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
  readonly dialog = inject(MatDialog);
  addProject() {
    const dialogRef = this.dialog.open(AddProjectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
