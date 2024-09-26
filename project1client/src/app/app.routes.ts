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

export const routes: Routes = [
  {path:'',redirectTo:'/signIn',pathMatch:'full'},
  {path:'signIn',component:SigninComponent,title:'Đăng nhập'},
  {path:'dashboard',component:DashboardComponent},
  {path:'resetpassword',component:ResetpasswordComponent, title:'Đặt lại mật khẩu'},
  {path:'changepassword',component:ChangepasswordComponent, title:'Đổi mật khẩu'},
  {path:'user-management',component:AllUserComponent, title:'Quản lí người dùng',canActivate: [authGuard], // Áp dụng guard
    data: { requiredPermission: 'USER_MANAGEMENT' }},
  {path:'user-management/add',component:AddUserComponent, title:'Thêm người dùng',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'authorization',component:AuthorizationComponent, title:'Phân quyền',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'all-role',component:AllRoleComponent, title:'Quản lí vai trò',canActivate: [authGuard] },
  {path:'user-management/edit-user/:id',component:EditUserComponent, title:'Sửa người dùng',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'EDIT_USER'] } }, // Áp dụng guard}
  {path:'authorization/permission-list',component:PermissionListComponent, title:'Danh sách quyền',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }},
  {path:'authorization/role-list',component:RoleListComponent, title:'Danh sách vai trò',canActivate: [authGuard] ,data: { requiredPermissions: ['AUTHORIZATION'] }}// Áp dụng guard}
];
