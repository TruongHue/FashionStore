// user.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/Admin/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private service: SharedService) {}

  DSSanPham: any = [];
  Search: string = '';

  ngOnInit(): void {
    this.reLoadDSanPham();
  }

  reLoadDSanPham() {
    this.service.layDSSanPham().subscribe((data) => {
      this.DSSanPham = data;
    });
  }

  themGioHang(sanPham) {
    var val = {
      iDKhachHang: 2,
      idSanPham: sanPham.id,
      nameSanPham: sanPham.name,
      priceSanPham: sanPham.price,
      soLuong: 1,
      image: sanPham.image
    };

    this.service.themSPGioHang(val).subscribe((result: any) => {
      alert("Thêm thành công!");
      this.reLoadDSanPham();
    }, error => {
      alert("Thêm không thành công!");
    });
  }

  timKiem(searchValue: string) {
    this.service.timKiemDSSanPhamName(searchValue).subscribe((data) => {
      alert ("tìm thấy");
      this.DSSanPham = data;
    });
  }
}
