import {Component, Input, OnInit, output} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sua-danh-muc',
  templateUrl: './sua-danh-muc.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './sua-danh-muc.component.css'
})
export class SuaDanhMucComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() danhMuc: any;
  id: number;
  tenDM: string;
  moTa: string;

  ngOnInit(): void {
    this.reLoadDSDanhMuc();
    this.id = this.danhMuc.id;
    this.tenDM = this.danhMuc.tenDM;
    this.moTa = this.danhMuc.moTa;
  }

  reLoadDSDanhMuc() {
    this.service.layDSDanhMuc().subscribe((data) => {
      this.danhMuc = data;
    });
  }
  suaDanhMuc() {
    var val = {
      id: this.id,
      tenDM: this.tenDM,
      moTa: this.moTa,
    };
    this.service.suaDanhMuc(val).subscribe(
      (result) => {
        alert('Cập nhật thông tin danh mục thành công!');
        this.reLoadDSDanhMuc();
      },
      (error) => {
        alert('Đã xảy ra lỗi khi cập nhật thông tin danh mục!');
      }
    );
  }
}
