import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sua-san-pham',
  templateUrl: './sua-san-pham.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './sua-san-pham.component.css'
})
export class SuaSanPhamComponent implements OnInit {

  constructor(private service: SharedService) {}

  @Input() sanPham: any;
  idSP: number;
  tenSP: string;
  moTa: string;
  giaBan: number;
  soLuong: number;
  image: string;
  idThuongHieu: number | null = null;
  idDanhMuc: number | null = null;
  thuongHieuList: any[] = [];
  danhMucList: any[] = [];
  FileImage: File | null = null;

  ngOnInit(): void {
    this.loadThuongHieuList();
    this.loadDanhMucList();
    this.reLoadDSanPham();
    this.idSP = this.sanPham.idSP;
    this.tenSP = this.sanPham.tenSP;
    this.moTa = this.sanPham.moTa;
    this.giaBan = this.sanPham.giaBan;
    this.soLuong = this.sanPham.soLuong;
    this.idThuongHieu = this.sanPham.idThuongHieu;
    this.idDanhMuc = this.sanPham.idDanhMuc;
    this.image = this.sanPham.image;
  }

  reLoadDSanPham() {
    this.service.layDSSanPham().subscribe((data) => {
      this.sanPham = data;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.FileImage = event.target.files[0];
      /*const fileName = this.image.name;
      const assetsPath = 'src/assets/';
      this.image = assetsPath + fileName;*/
    }
  }

  suaSanPham() {
    const formData = new FormData();
       formData.append('tenSP', this.tenSP);
       formData.append('moTa', this.moTa);
       formData.append('giaBan', this.giaBan.toString());
       formData.append('soLuong', this.soLuong.toString());
       formData.append('idThuongHieu', this.idThuongHieu.toString());
       formData.append('idDanhMuc', this.idDanhMuc.toString());
       formData.append('image', this.FileImage);

    this.service.suaDSSanPham(formData, this.idSP).subscribe(
      (result) => {
        alert('Cập nhật thông tin sản phẩm thành công!');
        this.reLoadDSanPham();
      },
      (error) => {
        alert('Đã xảy ra lỗi khi cập nhật thông tin sản phẩm!');
      }
    );
  }

  private loadThuongHieuList() {
    this.service.getThuongHieuList().subscribe(
      (data: any[]) => {
        this.thuongHieuList = data;
      },
      error => {
        console.error('Error loading ThuongHieu list:', error);
      }
    );
  }

  private loadDanhMucList() {
    this.service.getDanhMucList().subscribe(
      (data: any[]) => {
        this.danhMucList = data;
      },
      error => {
        console.error('Error loading DanhMuc list:', error);
      }
    );
  }
}
