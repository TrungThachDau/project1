import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  singOut(){
    this.authService.signOut();
    this.router.navigate(['/signIn']);
  }
}
