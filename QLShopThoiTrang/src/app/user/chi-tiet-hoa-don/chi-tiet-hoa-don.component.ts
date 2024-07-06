import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-chi-tiet-hoa-don',
  templateUrl: './chi-tiet-hoa-don.component.html',
  styleUrls: ['./chi-tiet-hoa-don.component.css']
})
export class ChiTietHoaDonComponent implements OnInit {

  idHD: number;
  DSSP: any = [];
  TTHD: any = [];
  User:any =[];
  idKhachHang:number;
  hinhThucThanhToan: string;

  constructor(private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    this.idKhachHang = this.service.getLoggedInUserId();
    this.idHD = +this.route.snapshot.paramMap.get('idHD');
    this.reload();
    this.reloadHD();
    this.getUser();
  }

  reload() {
    this.service.layChiTietHoaDon(this.idHD).subscribe(
      (data) => {
        this.DSSP = data;
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết hóa đơn:', error);
      }
    );
  }

  reloadHD() {
    this.service.layHoaDonid(this.idHD).subscribe(
      (data) => {
        this.TTHD = data;
        this.hinhThucThanhToan = this.TTHD.hinhThucThanhToan; // Initialize hinhThucThanhToan
      },
      (error) => {
        console.error('Lỗi khi tải hóa đơn:', error);
      }
    );
  }

  chiTietHTTT() {
    if (this.TTHD.hinhThucThanhToan === "tien-mat") {
      this.hinhThucThanhToan = "thanh toán bằng tiền mặt";
    }
  }

  getUser(){
    this.service.layUser(this.idKhachHang).subscribe(
      (data)=>{
        this.User = data;
      }
    )
  }
}
