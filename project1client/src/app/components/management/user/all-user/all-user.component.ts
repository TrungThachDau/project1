import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTableModule
} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {UserListSectionComponent} from "../../list-section/user-list-section.component";
import {UserService} from "../../../../services/user.service";

import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {MatOptionModule} from "@angular/material/core";
import {SpinnerService} from "../../../../services/spinner.service";

@Component({
    selector: 'app-all-user',
    imports: [
    NavbarComponent,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatTableModule,
    MatListModule,
    UserListSectionComponent,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatLabel,
    MatInput,
    MatIconModule,
    MatMenuModule,
    RouterLinkActive,
    MatFabButton,
    MatToolbarModule,
    ReactiveFormsModule
],
    templateUrl: './all-user.component.html',
    styleUrl: './all-user.component.scss'
})
export class AllUserComponent implements OnInit {
  users:any[] = [];
  filteredUsers:any[] = [];
  search = new FormControl('');
  constructor(private userService: UserService, private spinnerService :SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.userService.getAll().subscribe(data => {
      //Load len table
      this.users = data;
      this.filteredUsers = data;
      this.spinnerService.hide();
    },
    error => {
      console.log(error);
    });
    this.search.valueChanges
      .pipe(debounceTime(300)) // Đợi 300ms sau khi gõ xong mới lọc
      .subscribe(value => {
        this.filteredUsers = this.filterUsers(value);
      });
  }

  filterUsers(searchTerm: string | null): any[] {
    if (!searchTerm) {
      return this.users;
    }
    return this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
