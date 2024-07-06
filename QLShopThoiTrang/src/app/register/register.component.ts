import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent{

  constructor(private auth: AuthService,
              private router: Router) {}

  id: number;
  userName: string;
  tenUser: string;
  sdt: string;
  diaChi: string;
  password: string;
  repassword: string;

  dangKy() {
    if(this.password == this.repassword)
    {
      var val = {
        userName: this.userName,
        tenUser: this.tenUser,
        sdt: this.sdt,
        diaChi: this.diaChi,
        password: this.password
      };

      this.auth.dangKy(val).subscribe((result: any) => {
        alert("Đăng ký thành công!".toString());
        this.router.navigateByUrl('/login');
      }, error => {
        alert("Đăng ký thất bại !".toString());
        this.router.navigateByUrl('/register');
      });
    }
    else
      alert("Mật khẩu nhập lại không khớp!".toString());
      this.router.navigateByUrl('/register');
  }
}
