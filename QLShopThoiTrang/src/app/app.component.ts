import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QLShopThoiTrang';
  idKhachHang: number;
  User: any; // Khai báo User là một đối tượng, không phải mảng
  isLoggedIn: boolean;


  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.auth.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }


  ngOnInit(): void {
    this.idKhachHang = this.auth.getLoggedInUserId();
    if (this.idKhachHang) {
      this.layUser();
    };
    this.reloadAppComponent();
  }

  reloadAppComponent() {
    this.cdr.detectChanges();
  }


  layUser() {
    this.auth.layUser(this.idKhachHang).subscribe(
      (data: any) => {
        this.User = data;
      },
      error => {
        this.User=null;
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }

  dangXuat() {
    this.auth.dangXuat().subscribe(()=>{
         this.auth.daDangNhap();
        console.log('Đã đăng xuất thành công');
        this.idKhachHang = null;
        //window.location.reload();
        // Thực hiện các thao tác sau khi đăng xuất thành công, ví dụ chuyển hướng trang, xóa dữ liệu local,...
      },
      error => {
        console.error('Đã xảy ra lỗi khi đăng xuất', error);
        // Xử lý lỗi nếu cần thiết
      }
    );
  }

  quyen(): boolean {
    return this.auth.coQuyenAdmin();
  }

  daDangNhap() {
    return this.auth.daDangNhap();
  }
}
