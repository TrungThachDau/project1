import { Component } from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {
  MatCardModule
} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {UserService} from "../../../../services/user.service";
import {RoleService} from "../../../../services/role.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-detail-user',
    imports: [
        NavbarComponent,
        UserListSectionComponent,
        MatCardModule,
        MatButtonModule,
        RouterLink,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
    ],
    templateUrl: './detail-user.component.html',
    styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent {
  id!: string;
  user: any;
  constructor(private userService: UserService,private route: ActivatedRoute, private router: Router,private roleService: RoleService,public snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user=data;
    });
  }
}
