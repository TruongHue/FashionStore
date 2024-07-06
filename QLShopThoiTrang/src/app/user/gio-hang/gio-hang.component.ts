import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css']
})
export class GioHangComponent implements OnInit {
  DSSPGioHang: any = [];
  TongTien: number = 0; // Khởi tạo TongTien là số
  idKhachHang: number; // Khởi tạo idKhachHang là 2 mặc định

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.idKhachHang = this.service.getLoggedInUserId();
    this.reLoadGioHang();
  }



  reLoadGioHang() {
    this.service.laySPGioHang(this.idKhachHang).subscribe(
      (data) => {
        this.DSSPGioHang = data;
        // Tính lại tổng tiền khi load lại giỏ hàng
        this.TongTien = this.TinhTong();
      },
      (error) => {
        this.DSSPGioHang=[];
        console.error('Lỗi khi tải lại giỏ hàng:', error);
      }
    );
  }

  private TinhTong() {
    let total = 0;
    for (let item of this.DSSPGioHang) {
      total += item.soLuong * item.gia;
    }
    return total;
  }

  tangSL(gioHang) {
    gioHang.soLuong++;
    this.updateGioHang(gioHang);
  }

  giamSL(gioHang) {
    if (gioHang.soLuong > 1) {
      gioHang.soLuong--;
      this.updateGioHang(gioHang);
    } else {
      this.xoaGioHang(gioHang);
    }
  }
//idGioHang=2&User.userName=2&User.tenUser=2&User.sdt=2&User.diaChi=2&User.password=2&idSP=2&SanPham.idSP=2&SanPham.tenSP=2&SanPham.ThuongHieu.tenTH=2&SanPham.DanhMuc.tenDM=2&soLuong=10
  private updateGioHang(gioHang) {
    var val = {
      id: gioHang.idGioHang,
      idKhachHang: this.idKhachHang,
      idSanPham: gioHang.idSanPham,
      nameSanPham: gioHang.nameSanPham,
      priceSanPham: gioHang.priceSanPham,
      soLuong: gioHang.soLuong,
      image: gioHang.image
    };

    this.service.suaSPGioHang(val).subscribe(
      (result: any) => {
        this.TongTien = this.TinhTong();
      },
      (error) => {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        alert('Cập nhật giỏ hàng không thành công!');
      }
    );
  }

  xoaGioHang(gioHang){
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.service.xoaSPGiohang(gioHang.idGioHang).subscribe(
        (result: any) => {
          this.reLoadGioHang();
        },
        (error) => {
          this.reLoadGioHang();

        }
      );
    }
  }
}
