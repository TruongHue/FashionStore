import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router'; // Import Router từ @angular/router


@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class ThanhToanComponent implements OnInit {
 constructor(private service: AuthService,   private router: Router) {}

  DSSPGioHang: any = [];
  User:any=[];
  TongTien: number = 0; // Khởi tạo TongTien là số
  idKhachHang: number;
  diaChi: string = "";
  formattedDate: string = ''; // Khai báo biến formattedDate
  idHoaDonMoi: number=0;
  trangThai:string="";
  hinhThucThanhToan:string="";

  ngOnInit(): void {
    this.idKhachHang = this.service.getLoggedInUserId();
    this.formattedDate = this.getFormattedDate(); // Gán giá trị cho formattedDate khi khởi tạo component
    this.reLoadGioHang();
    this.getUser();
    this.id();
  }

  id(){
    this.idKhachHang = this.service.getLoggedInUserId();
  }

  reLoadGioHang() {
    this.service.laySPGioHang(this.idKhachHang).subscribe(
      (data) => {
        this.DSSPGioHang = data;
        // Tính lại tổng tiền khi load lại giỏ hàng
        this.TongTien = this.TinhTong();
      },
      (error) => {
        this.DSSPGioHang = [];
        console.error('Lỗi khi tải lại giỏ hàng:', error);
      }
    );
  }

  private TinhTong() {
    let total = 0;
    for (let item of this.DSSPGioHang) {
      total += item.soLuong * item.gia;
    }
    return total;
  }

  
  thanhToan() {
    var val = {
      diaChi: this.diaChi,
      idUser: this.idKhachHang,
      ngayTao: this.formattedDate, // Sử dụng formattedDate thay vì this.date
      trangThaiHD: "chờ xác nhận",
      hinhThucThanhToan: this.hinhThucThanhToan,
      tongTien: this.TongTien
    };
    this.service.themHoaDon(val).subscribe(
      (data:any) => {
        this.idHoaDonMoi = data.idHD;
        this.reLoadGioHang(); // Lấy ID hóa đơn từ response của service
        //http://localhost:5009/ChiTietHoaDon/create?idHD=1&idSP=1&soLuong=1&giaBan=1&thanhTien=1
        for(let sanPham of this.DSSPGioHang){
          let chiTiet={
            idHD: this.idHoaDonMoi,
            idSP :sanPham.idSP,
            soLuong: sanPham.soLuong,
            gia: sanPham.gia,
            thanhTien: sanPham.soLuong * sanPham.gia
          }

          this.service.themChiTietHD(chiTiet).subscribe(
            (data)=>{
              alert('thêm chi tiết hóa đơn thành công');
            }
          );
        }

        this.service.xoaToanBoGioHangUser(this.idKhachHang).subscribe(
          (data)=>{
            alert('Thanh toán thành công'); 
            this.router.navigate(['user']); 
          }
        ),
        (error) => {
          console.error('Lỗi', error);
        }
        // Sau khi lấy được ID, bạn có thể làm gì đó với ID này
      },
      (error) => { 
        alert('Đã xảy ra lỗi khi thêm hóa đơn');
        console.error('Error:', error);
      }
    );
   
  }

  private getFormattedDate(): string {
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0');
    return formattedDate;
  }

  getUser(){
    this.service.layUser(this.idKhachHang).subscribe(
      (data)=>{
        this.User = data;
      }
    )
  }
}
