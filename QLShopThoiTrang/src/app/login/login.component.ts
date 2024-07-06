import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(private auth: AuthService,
              private router: Router, ) {}

  userName: string;
  password: string;
  idUser:number;
  quyen:string;


  dangNhap() {
    if (this.userName && this.password) {
      const val = {
        userName: this.userName,
        password: this.password
      };

      this.auth.dangNhap(val).subscribe(
        (result: any) => {
          alert("Đăng nhập thành công!");
          this.userName = val.userName;
          this.idUser = this.auth.getLoggedInUserId();
          
          this.auth.layUser(this.idUser).subscribe(
            (data: any) => {
              this.quyen = data.quyen;
              if (this.quyen === "Admin") {
                this.router.navigateByUrl('/admin');
              } else {
                this.router.navigateByUrl('/user');
              }
            },
            (error) => {
              console.error('Lỗi khi lấy thông tin người dùng:', error);
              alert('Đã xảy ra lỗi khi lấy thông tin người dùng.');
            }
          );
        },
        (error) => {
          console.error('Lỗi đăng nhập:', error);
          alert('Tên đăng nhập hoặc mật khẩu không đúng!');
          this.router.navigateByUrl('/login');
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin để đăng nhập!');
    }
  }
}
