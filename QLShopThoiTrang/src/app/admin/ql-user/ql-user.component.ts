import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../Services/Admin/shared.service";

@Component({
  selector: 'app-ql-user',
  templateUrl: './ql-user.component.html',
  styleUrl: './ql-user.component.css'
})
export class QlUserComponent implements OnInit {
  constructor(private service: SharedService) {}

  DSUser: any = [];
  user: any;
  idUser: number = 0;
  userName: string;
  tenUser: string;
  sdt: string;
  diaChi: string;
  password: string;
  quyen: string;
  sua: boolean = false;
  them: boolean = false;
  xem: boolean = false;
  searchString: string = "";

  ngOnInit(): void {
    this.reLoadUser();
    this.idUser = this.DSUser.idUser;
    this.tenUser = this.DSUser.tenUser;
    this.userName = this.DSUser.userName;
    this.password = this.DSUser.password;
    this.sdt = this.DSUser.sdt;
    this.diaChi = this.DSUser.diaChi;
    this.quyen = this.DSUser.quyen;
  }

  reLoadUser() {
    this.service.layDSUser().subscribe((data) => {
      this.DSUser = data;
    });
  }

  dongSua(){
    this.sua=false;
    this.reLoadUser();
  }

  dongThem(){
    this.them=false;
    this.reLoadUser();
  }

  dongXem(){
    this.xem=false;
  }

  timUser() {
    if (!this.searchString)
      this.reLoadUser();
    this.service.timUser(this.searchString).subscribe(
      data => {
        this.DSUser = data;
      },error => {
        console.error('Error fetching users', error);
      }
    );
  }

  suaUser(user: any){
    this.user = user;
    this.sua = true;
    this.idUser = this.user.idUser;
    this.tenUser = "";
    this.userName = "";
    this.password = "";
    this.sdt = "";
    this.diaChi = "";
  }

  xemUser(user: any) {
    this.user = user;
    this.xem = true;
    this.idUser = this.user.idUser;
    this.tenUser = this.user.tenUser;
    this.userName = this.user.userName;
    this.password = this.user.password;
    this.sdt = this.user.sdt;
    this.diaChi = this.user.diaChi;
  }

  xoaUser(user:any) {
    const idUser = user.idUser;
    if (confirm(`Bạn có chắc muốn xóa người dùng ${user.tenUser} không?`)) {
      this.service.xoaUser(idUser).subscribe((result: any) => {
        alert("Xóa người dùng thành công!");
        this.reLoadUser();
      }, error => {
        alert("Đã xảy ra lỗi khi xóa người dùng!");
      });
    }
  }

  themUser() {
    this.them = true;
  }
}
