import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-them-thuong-hieu',
  templateUrl: './them-thuong-hieu.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './them-thuong-hieu.component.css'
})
export class ThemThuongHieuComponent implements OnInit {

  DSThuongHieu: any = [];
  tenTH: string = '';
  moTa: string = '';

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.reLoadDSThuongHieu();
    this.tenTH = this.DSThuongHieu.tenTH;
    this.moTa = this.DSThuongHieu.moTa;
  }

  reLoadDSThuongHieu() {
    this.service.layDSThuongHieu().subscribe((data) => {
      this.DSThuongHieu = data;
    });
  }

  themThuongHieu() {
    const val = {
      tenTH: this.tenTH,
      moTa: this.moTa,
    };

    this.service.themThuongHieu(val).subscribe(
      (result: any) => {
        alert('Thêm thương hiệu thành công!');
        this.reLoadDSThuongHieu();
        this.resetForm();
      }, error => {
        alert('Đã xảy ra lỗi khi thêm thương hiệu!');
      });
  }

  resetForm() {
    this.tenTH = '';
    this.moTa = '';
  }
}
