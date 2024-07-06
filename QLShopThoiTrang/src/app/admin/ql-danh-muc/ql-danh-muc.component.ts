import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../Services/Admin/shared.service";

@Component({
  selector: 'app-ql-danh-muc',
  templateUrl: './ql-danh-muc.component.html',
  styleUrl: './ql-danh-muc.component.css'
})
export class QlDanhMucComponent implements OnInit {

  constructor(private service: SharedService) {}

  DSDanhMuc : any = [];
  danhMuc: any;
  id: number = 0;
  tenDM: string = "";
  moTa: string = "";
  sua: boolean = false;
  them: boolean = false;
  xem: boolean = false;
  searchString: string = "";

  ngOnInit(): void {
    this.reLoadDanhMuc();
    this.id = this.DSDanhMuc.id;
    this.tenDM = this.DSDanhMuc.tenDM;
    this.moTa = this.DSDanhMuc.moTa;
  }

  reLoadDanhMuc() {
    this.service.layDSDanhMuc().subscribe((data) => {
      this.DSDanhMuc = data;
    });
  }

  dongSua(){
    this.sua=false;
    this.reLoadDanhMuc();
  }

  dongThem(){
    this.them=false;
    this.reLoadDanhMuc();
  }

  dongXem(){
    this.xem=false;
  }

  timDanhMuc() {
    if (!this.searchString)
      this.reLoadDanhMuc()
    this.service.timDanhMuc(this.searchString).subscribe(
        data => {
          this.DSDanhMuc = data;
        },error => {
          console.error('Error fetching danhmucs', error);
        }
      );
  }

  suaDanhMuc(danhMuc: any){
    this.danhMuc = danhMuc;
    this.sua = true;
    this.id = this.DSDanhMuc.id;
    this.tenDM = "";
    this.moTa = "";
  }

  xemDanhMuc(danhMuc: any) {
    this.danhMuc = danhMuc;
    this.xem = true;
    this.id = this.DSDanhMuc.id;
    this.tenDM = this.DSDanhMuc.tenDM;
    this.moTa = this.DSDanhMuc.moTa;
  }

  xoaDanhMuc(danhMuc: any) {
    const id = danhMuc.id;
    if (confirm(`Bạn có chắc muốn xóa danh mục ${danhMuc.tenDM} không?`)) {
      this.service.xoaDanhMuc(id).subscribe(
        (result) => {
          alert('Xóa danh mục thành công!');
          this.reLoadDanhMuc();
        },
        (error) => {
          alert('Đã xảy ra lỗi khi xóa danh mục!');
          console.error(error);
        }
      );
    }
  }

  themDanhMuc() {
    this.them = true;
  }
}
