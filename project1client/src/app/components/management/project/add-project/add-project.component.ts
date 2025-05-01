import { Component } from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
@Component({
    selector: 'app-add-project',
    imports: [
        NavbarComponent,
        UserListSectionComponent,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './add-project.component.html',
    styleUrl: './add-project.component.scss',
    providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }]
})
export class AddProjectComponent {
}
