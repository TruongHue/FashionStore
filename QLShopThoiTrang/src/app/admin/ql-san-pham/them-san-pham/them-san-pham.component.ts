import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './them-san-pham.component.css'
})
export class ThemSanPhamComponent implements OnInit {

  DSSanPham: any = [];
  tenSP: string = '';
  moTa: string = '';
  giaBan: number | null = null;
  soLuong: number | null = null;
  idThuongHieu: number | null = null;
  idDanhMuc: number | null = null;
  thuongHieuList: any[] = [];
  danhMucList: any[] = [];
  image: File | null = null;

  constructor(private service: SharedService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadThuongHieuList();
    this.loadDanhMucList();
    this.reLoadDSanPham();
    this.tenSP = this.DSSanPham.tenSP;
    this.moTa = this.DSSanPham.moTa;
    this.giaBan = this.DSSanPham.giaBan;
    this.soLuong = this.DSSanPham.soLuong;
    this.idThuongHieu = this.DSSanPham.idThuongHieu;
    this.idDanhMuc = this.DSSanPham.idDanhMuc;
    this.image = this.DSSanPham.image;
  }

  reLoadDSanPham() {
    this.service.layDSSanPham().subscribe((data) => {
      this.DSSanPham = data;
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      /*const fileName = this.image.name;
      const assetsPath = 'src/assets/';
      this.image = assetsPath + fileName;*/
    }
  }

  themSanPham() {
    /*var val = {
      tenSP: this.tenSP,
      moTa:this.moTa,
      giaBan: this.giaBan,
      soLuong: this.soLuong,
      idThuongHieu: this.idThuongHieu,
      idDanhMuc: this.idDanhMuc,
      image: this.image
    };*/
    const formData = new FormData();
    formData.append('tenSP', this.tenSP);
    formData.append('moTa', this.moTa);
    formData.append('giaBan', this.giaBan.toString());
    formData.append('soLuong', this.soLuong.toString());
    formData.append('idThuongHieu', this.idThuongHieu.toString());
    formData.append('idDanhMuc', this.idDanhMuc.toString());
    formData.append('image', this.image);

    this.service.themDSSanPham(formData).subscribe(
    (result: any) => {
      alert('Thêm sản phẩm thành công!');
      this.reLoadDSanPham();
      this.resetForm();
    }, error => {
      alert('Đã xảy ra lỗi khi thêm sản phẩm!');
    });
  }

  resetForm() {
    this.tenSP = '';
    this.moTa = '';
    this.giaBan = null;
    this.soLuong = null;
    this.idThuongHieu = null;
    this.idDanhMuc = null;
    this.image = null;
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
