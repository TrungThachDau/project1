import { Component } from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";

@Component({
    selector: 'app-bill',
    imports: [
        NavbarComponent,
        MatButton,
        MatCardModule,
        MatIcon,
        MatMenuModule,
        MatToolbar,
        RouterLink,
        UserListSectionComponent,
    ],
    templateUrl: './bill.component.html',
    styleUrl: './bill.component.scss'
})
export class BillComponent {

}
