import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
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
import {AuthorizationService} from "../../../services/authorization.service";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import { idToken } from '@angular/fire/auth';

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
    NgIf,
    MatButton,
    RouterLink,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] = []; // options chứa các đối tượng thay vì chuỗi
  filteredOptions!: Observable<any[]>; // Observable trả về các đối tượng
  allPermissions: any[] = [];
  permissionsSelected: any[] = [];
  roleSelected: any;

  constructor(private snackBar: MatSnackBar,private roleService: RoleService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.loadRoles();

    // Thay đổi để load tất cả các option khi input trống
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.loadAllPermissions();
  }

  private loadRoles() {
    this.roleService.getAll().subscribe(
      (data: any[]) => { // Nhận mảng các đối tượng từ API
        this.options = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  private _filter(value: any): any[] {
    // Kiểm tra xem value có phải là chuỗi không, nếu không thì chuyển nó thành chuỗi rỗng
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';

    // Trả về toàn bộ options nếu không có ký tự nhập vào
    return filterValue ? this.options.filter(option =>
      option.name_role.toLowerCase().includes(filterValue)
    ) : this.options;
  }


  onRoleSelected($event: MatAutocompleteSelectedEvent) {
    const selectedRole = $event.option.value;
    this.roleSelected = selectedRole;
    this.loadPermissionByRole(selectedRole);
  }

  private loadPermissionByRole(id: number) {
    this.authorizationService.getPermissionByRole(id).subscribe(
      (data: any[]) => {
        // Gán danh sách quyền đã được chọn cho vai trò vào `permissionsSelected`
        this.permissionsSelected = data;

        // So sánh các quyền trong `allPermissions` với các quyền đã được chọn
        this.allPermissions.forEach(permission => {
          // So sánh `permission.id_permission` với `permissionsSelected.permission.id_permission`
          permission.checked = this.permissionsSelected.some(selectedPermission =>
            selectedPermission.permission.id_permission === permission.id_permission
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private loadAllPermissions() {
    this.authorizationService.getAllPermission().subscribe(
      (data: any[]) => {
        this.allPermissions = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  saveRolePermission() {
    const roleId = this.roleSelected;
    const permissions = this.allPermissions.filter(permission => permission.checked);

    const data = permissions.map(permission => ({
      id_role: roleId,
      id_permission: permission.id_permission,
      role: null,
      permission: null
    }));
    console.log(data);
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.authorizationService.putRolePermission(roleId, data, token).subscribe(
      () => {
        this.snackBar.open("Phân quyền thành công.", 'Đóng', { duration: 3000 });
      },
      error => {
        this.snackBar.open("Đã xảy ra lỗi, xin thử lại sau.", 'Đóng', { duration: 3000 });
        console.log(error);
      }
    );

  }
  };
}


