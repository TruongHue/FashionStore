import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../Services/auth.service"; // import service xác thực (nếu có)

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRole = next.data.expectedRole as string;

    // Kiểm tra logic xác thực
    if (this.authService.isLoginA()) {
      if (next.data.roles && next.data.roles.indexOf('Admin') !== -1) {
        if (this.authService.coQuyenAdmin()) {
          return true;
        } else {
          alert("Bạn không có quyền truy cập trang này!");
          this.router.navigate(['/']);
          return false;
        }
      }
      return true;
    }
    else
    {
      alert("Bạn chưa đăng nhập!");
      return this.router.navigate(['/login']);
    }
  }
}
