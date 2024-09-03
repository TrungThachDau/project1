import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {signOut} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signOut(){
    this.authService.signOut();
    this.router.navigate(['/signIn']);
  }
}
