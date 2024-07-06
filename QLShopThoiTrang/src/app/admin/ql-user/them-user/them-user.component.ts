import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-them-user',
  templateUrl: './them-user.component.html',
  styleUrl: './them-user.component.css'
})
export class ThemUserComponent implements OnInit{

  DSUser: any = [];
  tenUser: string = '';
  sdt: string = '';
  diaChi: string = '';
  userName: string = '';
  password: string = '';
  repassword: string = '';

  constructor(private service: AuthService,
              private service2: SharedService) { }

  ngOnInit(): void {
    this.reLoadDSUser();
    this.tenUser = this.DSUser.tenUser;
    this.sdt = this.DSUser.sdt;
    this.diaChi = this.DSUser.diaChi;
    this.userName = this.DSUser.userName;
    this.password = this.DSUser.password;
    this.repassword = this.DSUser.repassword;
  }

  reLoadDSUser() {
    this.service2.layDSUser().subscribe((data) => {
      this.DSUser = data;
    });
  }

  themUser() {
    if(this.password == this.repassword) {
      var val = {
        userName: this.userName,
        tenUser: this.tenUser,
        sdt: this.sdt,
        diaChi: this.diaChi,
        password: this.password
      };

      this.service.dangKy(val).subscribe(
        (result: any) => {
          alert('Thêm người dùng thành công!');
          this.reLoadDSUser();
          this.resetForm();
        }, error => {
          alert('Đã xảy ra lỗi khi thêm người dùng!');
        });
    }
    else
      alert("Mật khẩu nhập lại không khớp!");
  }

  resetForm() {
    this.tenUser = '';
    this.sdt = '';
    this.diaChi = '';
    this.userName = '';
    this.password = '';
    this.repassword = '';
  }
}
