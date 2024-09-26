import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-authorization-list-section',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './authorization-list-section.component.html',
  styleUrl: './authorization-list-section.component.scss'
})
export class AuthorizationListSectionComponent {

}
