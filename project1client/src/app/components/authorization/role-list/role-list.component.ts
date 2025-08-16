import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {RoleService} from "../../../services/role.service";
import {RouterLink} from "@angular/router";

import {DeleteSubmitComponent} from "../../delete-submit/delete-submit.component";
import {MatDialog} from "@angular/material/dialog";
import {UserListSectionComponent} from "../../management/list-section/user-list-section.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
    selector: 'app-role-list',
    imports: [
    NavbarComponent,
    RouterLink,
    UserListSectionComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule
],
    templateUrl: './role-list.component.html',
    styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit{
  roles:any[] = [];
  filteredRoles:any[] = [];
  constructor(private roleService: RoleService) { }
  readonly dialog = inject(MatDialog);
  search = new FormControl('');
  ngOnInit(): void {
    this.roleService.getAll().subscribe(data => {
        //Load len table
        this.roles = data;
        this.filteredRoles = this.roles;
      },
      error => {
        console.log(error);
      });
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(searchTerm => {
      this.filteredRoles = this.filterRole(searchTerm);

    }
    );

  }
  filterRole(searchTerm: string | null): any[] {
    if (!searchTerm) {
      return this.roles;
    }
    return this.roles.filter(role =>
      role.name_role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  openDialog(id: number, exitAnimationDuration: string, enterAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteSubmitComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {name: "quyền"}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.deleteRole(id);
      this.ngOnInit();
    });

  }
  deleteRole(id: number): void {
    try{
      this.roleService.deleteRole(id).subscribe(() => {
        this.ngOnInit();
      });
    }
    catch (e) {
      alert("Có lỗi xảy ra");
    }
  }
}
