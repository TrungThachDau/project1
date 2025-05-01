import { Component } from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {NavbarComponent} from "../../../../navbar/navbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserListSectionComponent} from "../../../list-section/user-list-section.component";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";

@Component({
    selector: 'app-add-bill',
    imports: [
        NavbarComponent,
        UserListSectionComponent,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './add-bill.component.html',
    styleUrl: './add-bill.component.scss',
    providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }]
})
export class AddBillComponent {

}
