import {Component, inject, OnInit} from '@angular/core';
import {AuthorizationListSectionComponent} from "../authorization-list-section/authorization-list-section.component";
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {DeleteSubmitComponent} from "../../delete-submit/delete-submit.component";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogAddUserSuccessfulComponent
} from "../../management/user/add-user/dialog-add-user-successful/dialog-add-user-successful.component";

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    AuthorizationListSectionComponent,
    NavbarComponent,
    RouterLink,
    NgForOf,
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit{
  roles:any[] = [];
  constructor(private roleService: RoleService) { }
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.roleService.getAll().subscribe(data => {
        //Load len table
        this.roles = data;
      },
      error => {
        console.log(error);
      });
  }

  openDialog(id: number, exitAnimationDuration: string, enterAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteSubmitComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {name: "quyền"}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteRole(id);

      this.ngOnInit();
    });

  }
  deleteRole(id: number): void {
    try{
      this.roleService.deleteRole(id).subscribe(data => {
        this.ngOnInit();
      });
    }
    catch (e) {
      alert("Có lỗi xảy ra");
    }
  }
}
