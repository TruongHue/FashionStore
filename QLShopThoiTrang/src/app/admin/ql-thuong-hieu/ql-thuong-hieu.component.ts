import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/Admin/shared.service';

@Component({
  selector: 'app-ql-thuong-hieu',
  templateUrl: './ql-thuong-hieu.component.html',
  styleUrl: './ql-thuong-hieu.component.css'
})
export class QlThuongHieuComponent implements OnInit {
  constructor(private service: SharedService) {}

  DSThuongHieu : any = [];
  thuongHieu: any
  id: number = 0;
  tenTH: string = "";
  moTa: string = "";
  sua: boolean = false;
  them: boolean = false;
  xem: boolean = false;
  searchString: string = "";

  ngOnInit(): void {
    this.reLoadThuongHieu();
    this.id = this.DSThuongHieu.id;
    this.tenTH = this.DSThuongHieu.tenTH;
    this.moTa = this.DSThuongHieu.moTa;
  }

  reLoadThuongHieu() {
    this.service.layDSThuongHieu().subscribe((data) => {
      this.DSThuongHieu = data;
    });
  }

  dongSua(){
    this.sua=false;
    this.reLoadThuongHieu();
  }

  dongThem(){
    this.them=false;
    this.reLoadThuongHieu();
  }

  dongXem(){
    this.xem=false;
  }

  timThuongHieu() {
    if (!this.searchString)
      this.reLoadThuongHieu();
    this.service.timThuongHieu(this.searchString).subscribe(
      data => {
        this.DSThuongHieu = data;
      },error => {
        console.error('Error fetching thuonghieus', error);
      }
    );
  }

  suaThuongHieu(thuongHieu: any){
    this.thuongHieu = thuongHieu;
    this.sua = true;
    this.id = this.DSThuongHieu.id;
    this.tenTH = "";
    this.moTa = "";
  }

  xemThuongHieu(thuongHieu: any) {
    this.thuongHieu = thuongHieu;
    this.xem = true;
    this.id = this.DSThuongHieu.id;
    this.tenTH = this.DSThuongHieu.tenTH;
    this.moTa = this.DSThuongHieu.moTa;
  }

  xoaThuongHieu(thuongHieu: any) {
    const id = thuongHieu.id;
    if (confirm(`Bạn có chắc muốn xóa thương hiệu ${thuongHieu.tenTH} không?`)) {
      this.service.xoaThuongHieu(id).subscribe(
        (result) => {
          alert('Xóa thương hiệu thành công!');
          this.reLoadThuongHieu();
        },
        (error) => {
          alert('Đã xảy ra lỗi khi xóa thương hiệu!');
        }
      );
    }
  }

  themThuongHieu() {
    this.them = true;
  }
}
