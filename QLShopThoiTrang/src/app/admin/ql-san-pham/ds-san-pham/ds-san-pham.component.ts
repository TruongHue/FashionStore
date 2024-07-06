import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/Admin/shared.service';


@Component({
  selector: 'app-ds-san-pham',
  templateUrl: './ds-san-pham.component.html',
  styleUrls: ['./ds-san-pham.component.css'] // Đã sửa
})
export class DsSanPhamComponent implements OnInit {
  constructor(private service: SharedService) {}

  DSSanPham: any = [];
  sanPham: any;
  sua: boolean = false;
  them: boolean = false;
  xem: boolean = false;
  idSP: number = 0;
  tenSP: string = "";
  moTa: string = "";
  giaBan: number = 0;
  soLuong: number = 0;
  idThuongHieu: number = 0;
  idDanhMuc: number = 0;
  image: string = "";
  tenDanhMuc: string = "";
  tenThuongHieu: string = "";
  searchString: string = "";

  ngOnInit(): void {
    this.reLoadSanPham();
    this.idSP = this.sanPham.idSP;
    this.tenSP = this.sanPham.tenSP;
    this.moTa = this.DSSanPham.moTa;
    this.giaBan = this.DSSanPham.giaBan;
    this.soLuong = this.DSSanPham.soLuong;
    this.image = this.DSSanPham.image;
  }

  reLoadSanPham() {
    this.service.layDSSanPham().subscribe((data) => {
      this.DSSanPham = data;
    });
  }


  dongSua(){
    this.sua=false;
    this.reLoadSanPham();
  }

  dongThem(){
    this.them=false;
    this.reLoadSanPham();
  }

  dongXem(){
    this.xem=false;
  }

  timSanPham() {
    if (!this.searchString)
      this.reLoadSanPham()
    this.service.timSanPham(this.searchString).subscribe(
      data => {
        this.DSSanPham = data;
      },error => {
        console.error('Error fetching sanphams', error);
      }
    );
  }

  suaSanPham(sanPham:any){
    this.sanPham = sanPham;
    this.sua = true;
    this.idSP = this.sanPham.idSP;
    this.tenSP = "";
    this.moTa = "";
    this.giaBan = 0;
    this.soLuong = 0;
    this.image = "";
  }

  xemSanPham(sanPham:any){
    this.sanPham = sanPham;
    this.xem = true;
    this.idSP = this.sanPham.idSP;
    this.tenSP = this.sanPham.tenSP;
    this.moTa = this.sanPham.moTa;
    this.giaBan = this.sanPham.giaBan;
    this.soLuong = this.sanPham.soLuong;
    this.image = this.sanPham.image;
  }

  xoaSanPham(sanPham:any) {
    const idSP = sanPham.idSP;
    if (confirm(`Bạn có chắc muốn xóa sản phẩm ${sanPham.tenSP} không?`)) {
      this.service.xoaDSSanPham(idSP).subscribe(
        (result) => {
          alert('Xóa sản phẩm thành công!');
          this.reLoadSanPham();
        },
        (error) => {
          alert('Đã xảy ra lỗi khi xóa sản phẩm!');
          console.error(error);
        }
      );
    }
  }

  themSanPham() {
    this.them = true;
  }
}
