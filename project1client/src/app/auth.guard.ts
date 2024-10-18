import { CanActivateFn } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  // Lấy danh sách quyền yêu cầu từ route (nên là một mảng các chuỗi)
  const requiredPermissions: string[] = route.data['requiredPermissions'] || [];
  const snackBar = inject(MatSnackBar);
  // Lấy danh sách quyền của người dùng từ sessionStorage (là một mảng các chuỗi)
  const permissions: string[] = JSON.parse(sessionStorage.getItem('permissions') || '[]');

  // Kiểm tra nếu tất cả quyền yêu cầu đều có trong danh sách quyền của người dùng
  const hasAllPermissions = requiredPermissions.every((permission: string) => permissions.includes(permission));

  if (hasAllPermissions) {
    return true; // Người dùng có đủ quyền
  }

  // Hiển thị thông báo và chặn truy cập

  snackBar.open('Bạn không có quyền truy cập trang này!', 'Đóng', {
    duration: 3000, // Thời gian snackbar hiển thị (ms)
  });
  return false;
};
