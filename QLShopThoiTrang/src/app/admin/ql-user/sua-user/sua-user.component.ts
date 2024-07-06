import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-sua-user',
  templateUrl: './sua-user.component.html',
  styleUrl: './sua-user.component.css'
})
export class SuaUserComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() user: any;
  //@Input() sua: true;
  idUser: number;
  tenUser: string;
  userName: string;
  sdt: string;
  diaChi: string;
  password: string;
  oldpassword: string;
  newpassword: string;
  repassword: string;
  info: boolean = true;
  pass: boolean = false;

  ngOnInit(): void {
    this.reLoadUser();
    this.idUser = this.user.idUser;
    this.tenUser = this.user.tenUser;
    this.userName = this.user.userName;
    this.sdt = this.user.sdt;
    this.diaChi = this.user.diaChi;
    this.password = this.user.password;
  }

  reLoadUser() {
    this.service.layDSUser().subscribe((data) => {
      this.user = data;
    });
  }

  changeInfo() {
    this.info = true;
    this.pass=false;
  }

  changePassword() {
    this.pass = true;
    this.info=false;
  }

  saveInfo() {
    var info = {
      idUser: this.idUser,
      tenUser: this.tenUser,
      userName: this.userName,
      sdt: this.sdt,
      diaChi: this.diaChi,
    }

    this.service.changeInfo(info).subscribe(
      (result) => {
        alert('Cập nhật thông tin người dùng thành công!');
        this.reLoadUser();
      },
      (error) => {
        alert('Đã xảy ra lỗi khi cập nhật thông tin người dùng!');
      }
    );
  }

  savePass() {
    if(this.newpassword == this.repassword)
    {
      if(this.oldpassword == this.password)
      {
        var pass = {
          idUser: this.idUser,
          password: this.newpassword,
        }

        this.service.changePass(pass).subscribe(
          (result) => {
            alert('Đổi mật khẩu thành công!');
            this.reLoadUser();
          },
          (error) => {
            alert('Đã xảy ra lỗi khi đổi mật khẩu!');
          }
        );
      }
      else
        alert("Mật khẩu cũ không đúng.")
    }
    else
      alert("Mật khẩu nhập lại không đúng");
  }
}
