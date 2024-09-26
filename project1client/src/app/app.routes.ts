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

export const routes: Routes = [
  {path:'',redirectTo:'/signIn',pathMatch:'full'},
  {path:'signIn',component:SigninComponent,title:'Đăng nhập'},
  {path:'dashboard',component:DashboardComponent},
  {path:'resetpassword',component:ResetpasswordComponent, title:'Đặt lại mật khẩu'},
  {path:'changepassword',component:ChangepasswordComponent, title:'Đổi mật khẩu'},
  {path:'all-user',component:AllUserComponent, title:'Quản lí người dùng',canActivate: [authGuard], // Áp dụng guard
    data: { requiredPermission: 'USER_MANAGEMENT' }},
  {path:'add-user',component:AddUserComponent, title:'Thêm người dùng',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'authorization',component:AuthorizationComponent, title:'Phân quyền',canActivate: [authGuard],data: { requiredPermissions: ['USER_MANAGEMENT', 'ADD_USER'] } }, // Áp dụng guard}
  {path:'all-role',component:AllRoleComponent, title:'Quản lí vai trò',canActivate: [authGuard] }, // Áp dụng guard}
];
