import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../navbar/navbar.component";
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";
import {MatList, MatListItem} from "@angular/material/list";
import {UserListSectionComponent} from "../user-list-section/user-list-section.component";
import {UserService} from "../../../../services/user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [
    NavbarComponent,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatTable,
    MatList,
    MatListItem,
    UserListSectionComponent,
    CommonModule
  ],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.scss'
})
export class AllUserComponent implements OnInit {
  users:any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => {
      //Load len table
      this.users = data;
    },
    error => {
      console.log(error);
    });
  }

}
