import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Lấy danh sách quyền yêu cầu từ route (nên là một mảng các chuỗi)
  const requiredPermissions: string[] = route.data['requiredPermissions'] || [];

  // Lấy danh sách quyền của người dùng từ sessionStorage (là một mảng các chuỗi)
  const permissions: string[] = JSON.parse(sessionStorage.getItem('permissions') || '[]');

  // Kiểm tra nếu tất cả quyền yêu cầu đều có trong danh sách quyền của người dùng
  const hasAllPermissions = requiredPermissions.every((permission: string) => permissions.includes(permission));

  if (hasAllPermissions) {
    return true; // Người dùng có đủ quyền
  }

  // Hiển thị thông báo và chặn truy cập
  alert('Bạn không có quyền truy cập trang này!');
  return false;
};
