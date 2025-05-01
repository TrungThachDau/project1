import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-user-list-section',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './user-list-section.component.html',
    styleUrl: './user-list-section.component.scss'
})
export class UserListSectionComponent {

}
