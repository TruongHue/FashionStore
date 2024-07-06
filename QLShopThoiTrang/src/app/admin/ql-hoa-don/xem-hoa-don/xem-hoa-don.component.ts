import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-xem-hoa-don',
  templateUrl: './xem-hoa-don.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './xem-hoa-don.component.css'
})
export class XemHoaDonComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() hoaDon: any;
  idHD: number;
  tenUser: string;
  sdt: string;
  diaChi: string;
  ngayTao: Date;
  tongTien: number;
  trangThaiHD: string;
  hinhThucThanhToan: string;
  sanPham: any[] = [];
  tenSP: string;
  image: string;
  giaBan: number;
  soLuong: number;

  ngOnInit() {
    this.idHD = this.hoaDon.idHD;
    this.tenUser = this.hoaDon.tenUser;
    this.sdt = this.hoaDon.sdt;
    this.diaChi = this.hoaDon.diaChi;
    this.ngayTao = this.hoaDon.ngayTao;
    this.tongTien = this.hoaDon.tongTien;
    this.trangThaiHD = this.hoaDon.trangThaiHD;
    this.hinhThucThanhToan = this.hoaDon.hinhThucThanhToan;
    this.reLoadDetailsHD();
  }

  reLoadDetailsHD() {
    this.service.sanPhamHD(this.idHD).subscribe((data: any[]) => {
      this.sanPham = data;
    });
  }
}
