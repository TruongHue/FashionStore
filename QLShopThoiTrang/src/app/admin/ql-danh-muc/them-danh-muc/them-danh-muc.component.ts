import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-them-danh-muc',
  templateUrl: './them-danh-muc.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './them-danh-muc.component.css'
})
export class ThemDanhMucComponent implements OnInit {

  DSDanhMuc: any = [];
  tenDM: string = '';
  moTa: string = '';

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.reLoadDSDanhMuc();
    this.tenDM = this.DSDanhMuc.tenTH;
    this.moTa = this.DSDanhMuc.moTa;
  }

  reLoadDSDanhMuc() {
    this.service.layDSDanhMuc().subscribe((data) => {
      this.DSDanhMuc = data;
    });
  }

  themDanhMuc() {
    const formData = new FormData();
    formData.append('tenDM', this.tenDM);
    formData.append('moTa', this.moTa);

    this.service.themDanhMuc(formData).subscribe(
      (result: any) => {
        alert('Thêm danh mục thành công!');
        this.reLoadDSDanhMuc();
        this.resetForm();
      }, error => {
        alert('Đã xảy ra lỗi khi thêm danh mục!');
      });
  }

  resetForm() {
    this.tenDM = '';
    this.moTa = '';
  }
}
