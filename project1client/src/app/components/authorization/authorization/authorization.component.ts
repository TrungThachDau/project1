import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserListSectionComponent} from "../../management/user/user-list-section/user-list-section.component";
import {AuthorizationListSectionComponent} from "../authorization-list-section/authorization-list-section.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {
  MatAutocomplete,
  MatAutocompleteModule, MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    AuthorizationListSectionComponent,
    NavbarComponent,
    MatCheckbox,
    MatIcon,
    NgForOf,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] = []; // options chứa các đối tượng thay vì chuỗi
  filteredOptions!: Observable<any[]>; // Observable trả về các đối tượng

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();

    // Thay đổi để load tất cả các option khi input trống
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value||''))
    );
  }

  private loadRoles() {
    this.roleService.getAll().subscribe(
      (data: any[]) => { // Nhận mảng các đối tượng từ API
        this.options = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value||''))
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value?.toLowerCase() || '';

    // Trả về toàn bộ options nếu không có ký tự nhập vào
    return filterValue ? this.options.filter(option =>
      option.name_role.toLowerCase().includes(filterValue)
    ) : this.options;
  }

  onRoleSelected($event: MatAutocompleteSelectedEvent) {
    alert($event.option.value);
  }
}

