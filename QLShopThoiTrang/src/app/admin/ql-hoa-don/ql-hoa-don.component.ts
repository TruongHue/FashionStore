import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/Admin/shared.service';

@Component({
  selector: 'app-ql-hoa-don',
  templateUrl: './ql-hoa-don.component.html',
  styleUrl: './ql-hoa-don.component.css'
})
export class QlHoaDonComponent implements OnInit {
  constructor(private service: SharedService) {}

  HDSanPham: any = [];
  hoaDon: any;
  idHD: number;
  tenUser: string;
  sdt: string;
  diaChi: string;
  ngayTao: Date;
  tongTien: number;
  trangThaiHD: string;
  hinhThucThanhToan: string;
  xem: boolean = false;
  searchString: string = "";

  ngOnInit(): void {
    this.reLoadHDSanPham();
    this.idHD = this.HDSanPham.idHD;
    this.tenUser = "";
    this.sdt = "";
    this.diaChi = "";
    this.ngayTao = this.HDSanPham.ngayTao;
    this.tongTien = 0;
    this.trangThaiHD = "";
    this.hinhThucThanhToan = "";
  }

  reLoadHDSanPham() {
    this.service.layHDSanPham().subscribe((data) => {
      this.HDSanPham = data;
    });
  }

  dongXem(){
    this.xem = false;
  }

  xemChiTietHoaDon(hoaDon: any){
    this.hoaDon = hoaDon;
    this.xem = true;
    this.idHD = this.hoaDon.idHD;
    this.tenUser = this.hoaDon.tenUser;
    this.sdt = this.hoaDon.sdt;
    this.diaChi = this.hoaDon.diaChi;
    this.ngayTao = this.hoaDon.ngayTao;
    this.tongTien = this.hoaDon.tongTien;
    this.trangThaiHD = this.hoaDon.trangThaiHD;
    this.hinhThucThanhToan = this.hoaDon.hinhThucThanhToan;
  }

  timHoaDon() {
    if (!this.searchString)
      this.reLoadHDSanPham()
    this.service.timHD(this.searchString).subscribe(
      data => {
        this.HDSanPham = data;
      },error => {
        console.error('Error fetching hoadons', error);
      }
    );
  }

  xoaHoaDon(hoaDon:any) {
    var idHD = hoaDon.idHD;
    if (confirm(`Bạn có chắc muốn xóa hóa đơn ${hoaDon.idHD} không?`)) {
      this.service.xoaHDSanPham(idHD).subscribe((result: any) => {
        alert("Xóa thành công!".toString());
        this.reLoadHDSanPham();
      }, error => {
        alert("Xóa không thành công!".toString());
      });
    }
  }
}
