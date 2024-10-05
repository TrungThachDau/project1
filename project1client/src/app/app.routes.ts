import { Routes } from '@angular/router';
import {SigninComponent} from "./components/admin/signin/signin.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {ResetpasswordComponent} from "./components/admin/resetpassword/resetpassword.component";
import { ChangepasswordComponent } from './components/admin/changepassword/changepassword.component';
import {AllUserComponent} from "./components/management/user/all-user/all-user.component";
import {authGuard} from "./auth.guard";
import {AddUserComponent} from "./components/management/user/add-user/add-user.component";
import { AuthorizationComponent } from './components/authorization/authorization/authorization.component';
import { AllRoleComponent } from './components/authorization/all-role/all-role.component';
import {EditUserComponent} from "./components/management/user/edit-user/edit-user.component";
import {PermissionListComponent} from "./components/authorization/permission-list/permission-list.component";
import {RoleListComponent} from "./components/authorization/role-list/role-list.component";
import {AddRoleComponent} from "./components/authorization/role-list/add-role/add-role.component";
import {EditRoleComponent} from "./components/authorization/role-list/edit-role/edit-role.component";

export const routes: Routes = [
  {path:'',redirectTo:'/signIn',pathMatch:'full'},
  {path:'signIn',component:SigninComponent,title:'Đăng nhập'},
  {path:'dashboard',component:DashboardComponent},
  {path:'resetpassword',component:ResetpasswordComponent, title:'Đặt lại mật khẩu'},
  {path:'changepassword',component:ChangepasswordComponent, title:'Đổi mật khẩu'},
  {path:'management',redirectTo:'/management/user',pathMatch:'full'},
  {path:'management/user',component:AllUserComponent, title:'Quản lý',canActivate: [authGuard], data: { requiredPermission: 'USER_MANAGEMENT' }},
  {path:'management/user/add',component:AddUserComponent, title:'Thêm người dùng',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'management/authorization',component:AuthorizationComponent, title:'Phân quyền',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'management/all-role',component:AllRoleComponent, title:'Quản lí vai trò',canActivate: [authGuard] },
  {path:'management/user/edit/:id',component:EditUserComponent, title:'Sửa người dùng',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'EDIT_USER'] } }, // Áp dụng guard}
  {path:'management/permission',component:PermissionListComponent, title:'Danh sách quyền',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }},
  {path:'management/role',component:RoleListComponent, title:'Danh sách vai trò',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }},// Áp dụng guard}
  {path:'management/role/add',component:AddRoleComponent, title:'Thêm vai trò',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }},// Áp dụng guard}
  {path:'management/role/edit/:id_role',component:EditRoleComponent, title:'Thêm vai trò',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }}// Áp dụng guard}
];
