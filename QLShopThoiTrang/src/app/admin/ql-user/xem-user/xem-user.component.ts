import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-xem-user',
  templateUrl: './xem-user.component.html',
  styleUrl: './xem-user.component.css'
})
export class XemUserComponent implements OnInit {

  @Input() user: any;
  idUser: number;
  tenUser: string;
  userName: string;
  sdt: string;
  diaChi: string;
  password: string;
  info: boolean = true;
  pass: boolean = false;

  ngOnInit(): void {
    this.idUser = this.user.idUser;
    this.tenUser = this.user.tenUser;
    this.userName = this.user.userName;
    this.sdt = this.user.sdt;
    this.diaChi = this.user.diaChi;
    this.password = this.user.password;
  }

  Info() {
    this.info = true;
    this.pass=false;
  }

  Password() {
    this.pass = true;
    this.info=false;
  }
}
