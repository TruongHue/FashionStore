import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-xem-san-pham',
  templateUrl: './xem-san-pham.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './xem-san-pham.component.css'
})
export class XemSanPhamComponent implements OnInit {

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
    this.idSP = this.sanPham.idSP;
    this.tenSP = this.sanPham.tenSP;
    this.moTa = this.sanPham.moTa;
    this.giaBan = this.sanPham.giaBan;
    this.soLuong = this.sanPham.soLuong;
    this.idThuongHieu = this.sanPham.idThuongHieu;
    this.idDanhMuc = this.sanPham.idDanhMuc;
    this.image = this.sanPham.image;
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
