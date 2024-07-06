import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrl: './hoa-don.component.css'  // Error is here
})
export class HoaDonComponent implements OnInit {
  DSHD: any = [];
  idKhachHang: number ;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.idKhachHang = this.service.getLoggedInUserId();
    this.reLoadHoaDon();
  }


  reLoadHoaDon() {
    this.service.layHoaDon(this.idKhachHang).subscribe(
      (data) => {
        this.DSHD = data;
      },
      (error) => {
        this.DSHD = [];
        console.error('Lỗi khi tải lại giỏ hàng:', error);
      }
    );
  }
}
