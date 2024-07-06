import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sua-thuong-hieu',
  templateUrl: './sua-thuong-hieu.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './sua-thuong-hieu.component.css'
})
export class SuaThuongHieuComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() thuongHieu: any;
  //@Input() sua: true;
  id: number;
  tenTH: string;
  moTa: string;

  ngOnInit(): void {
    this.reLoadDSThuongHieu();
    this.id = this.thuongHieu.id;
    this.tenTH = this.thuongHieu.tenTH;
    this.moTa = this.thuongHieu.moTa;
  }

  reLoadDSThuongHieu() {
    this.service.layDSThuongHieu().subscribe((data) => {
      this.thuongHieu = data;
    });
  }

  suaThuongHieu() {
    var val = {
      id: this.id,
      tenTH: this.tenTH,
      moTa: this.moTa,
    };

    this.service.suaThuongHieu(val).subscribe(
      (result) => {
        alert('Cập nhật thông tin thương hiệu thành công!');
        this.reLoadDSThuongHieu();
      },
      (error) => {
        alert('Đã xảy ra lỗi khi cập nhật thông tin thương hiệu!');
      }
    );
  }
}
