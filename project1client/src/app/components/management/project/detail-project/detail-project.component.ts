import {Component, inject} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {AddProjectComponent} from "../add-project/add-project.component";
import {AddBillComponent} from "../bill/add-bill/add-bill.component";

@Component({
    selector: 'app-detail-project',
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

  readonly dialog = inject(MatDialog);
  addBill() {
    const dialogRef = this.dialog.open(AddBillComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
