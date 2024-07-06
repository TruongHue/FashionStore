import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, catchError, tap, throwError} from "rxjs";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "http://localhost:5009";
  readonly PhotoUrl = "http://localhost:5009/Photos";
  private loggedInUserId: number;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  isLogin: boolean = false;
  isAdmin = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',}),
  };


  //Đăng ký
  dangKy(val:any) {
    return this.http.post(this.APIUrl+'/User/DangKy?&userName='+val.userName+'&tenUser='+val.tenUser+'&sdt='+val.sdt+'&diaChi='+val.diaChi+'&password='+val.password,val);
  }

  //Đăng nhập
  dangNhap(val:any): Observable<any>  {
    return this.http.post<any>(this.APIUrl+'/User/DangNhap?&userName='+val.userName+'&password='+val.password,val).pipe(
      tap((user) => {
        this.isLogin = true;
        this.isAdmin = user.quyen === 'Admin';
        this.setLoggedInUserId(user.idUser); // Lưu idUser khi đăng nhập thành công
        this.isLoggedInSubject.next(true);
      })
    );
  }

  //Đăng xuất
  //http://localhost:5009/User/DangXuat
  dangXuat(): Observable<any> {
    alert(`${this.APIUrl}/User/DangXuat`);
    return this.http.get<any>(`${this.APIUrl}/User/DangXuat`).pipe(
      tap(() => {
        alert('Đăng xuất thành công');
        this.clearLoggedInUser(); // Xóa thông tin đăng nhập khỏi localStorage khi đăng xuất thành công
        this.isLoggedInSubject.next(false); // Cập nhật trạng thái đăng nhập
      }),
      catchError(error => {
        console.error('Đã xảy ra lỗi khi đăng xuất:', error);
        return throwError('Đã xảy ra lỗi khi đăng xuất');
      })
    );
  }



  clearLoggedInUser() {
    localStorage.removeItem('loggedInUserId'); // Adjust as per your implementation
    // Clear other user-related data if necessary
  }


  setLoggedInUserId(userId: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedInUserId', userId.toString());
    }
  }

  getLoggedInUserId(): number {
    // Giả sử localStorage được sử dụng để lưu trữ idUser
    const userId = localStorage.getItem('loggedInUserId');
    return userId ? +userId : null; // Chuyển đổi thành số và trả về, hoặc null nếu không có
  }




  //Đã đăng nhập
  daDangNhap(): boolean {
    //window.location.reload();

    return !!localStorage.getItem('loggedInUserId');
  }

  isLoginA() {
    return this.isLogin;
  }

  //Kiểm tra quyền tài khoản
  coQuyenAdmin() {
    return this.isAdmin;
  }

    //Giỏ hàng
  ///GioHang?idSP=5&tenSP=1&soLuong=1&gia=1&idUser=1&image=1&tongTien=1
  themSPGioHang(val){
    return this.http.post(this.APIUrl+'/GioHang?idSP='+val.idSP+'&tenSP='+val.tenSP+'&soLuong='+val.soLuong+'&gia='+val.gia+'&idUser='+val.idUser+'&image='+val.image+'&tongTien='+val.tongTien,val);
  }

  //http://localhost:5009/GioHang/user/1?idUser=1
  laySPGioHang(val){
    return this.http.get(this.APIUrl+'/GioHang/user/'+val+'?idUser='+val);
  }

  //Sửa giỏ hàng
  //idGioHang=2&User.userName=2&User.tenUser=2&User.sdt=2&User.diaChi=2&User.password=2&idSP=2&SanPham.idSP=2&SanPham.tenSP=2&SanPham.ThuongHieu.tenTH=2&SanPham.DanhMuc.tenDM=2&soLuong=10

  suaSPGioHang( val: any) {
    //http://localhost:5009/GioHang/80?idSP=80&tenSP=1&soLuong=1&gia=1&idUser=1&image=1&tongTien=1
    return this.http.put(this.APIUrl+'/GioHang/'+val.id+'?idSP='+val.id+'&tenSP=1&soLuong='+val.soLuong+'&gia=1&idUser=1&image=1&tongTien=1',val);
  }

  xoaSPGiohang(val:any){
    //http://localhost:5009/GioHang/5
    return this.http.delete(this.APIUrl+'/GioHang/'+val);
  }

  timKiemDSSanPhamId(val:any){
    return this.http.get(this.APIUrl+'/sanPham/Id?Id='+val);
  }
  //http://localhost:5009/SanPham/tim-theo-ten/2

  timKiemDSSanPhamName(val:string){
    return this.http.get(this.APIUrl+'/SanPham/tim-theo-ten/'+val);
  }

  layDSSanPham(){
    return this.http.get(this.APIUrl+'/sanPham');
  }

  //http://localhost:5009/HoaDon?diaChi=1&idUser=1&ngayTao=2024-06-25&trangThaiHD=1&tongTien=1

  themHoaDon(val){
    //http://localhost:5009/HoaDon?diaChi=7&idUser=1&ngayTao=2024-06-25&trangThaiHD=fgdfr&hinhThucThanhToan=dfgdf&tongTien=23452
    return this.http.post(this.APIUrl+'/HoaDon?diaChi='+val.diaChi+'&idUser='+val.idUser+'&ngayTao='+val.ngayTao+'&trangThaiHD='+val.trangThaiHD+'&hinhThucThanhToan='+val.hinhThucThanhToan+'&tongTien='+val.tongTien,val);
  }

  themChiTietHD(val){
  ///http://localhost:5009/ChiTietHoaDon/create?idHD=1&idSP=1&soLuong=1&giaBan=1&thanhTien=1
  return this.http.post(this.APIUrl+'/ChiTietHoaDon/create?idHD='+val.idHD+'&idSP='+val.idSP+'&soLuong='+val.soLuong+'&giaBan='+val.gia+'&thanhTien='+val.thanhTien,val);
  }

  xoaToanBoGioHangUser(val){
    //http://localhost:5009/GioHang/user/1
    return this.http.delete(this.APIUrl+'/GioHang/user/'+val);
  }
  //http://localhost:5009/HoaDon/hoaDon/3?idUser=3
  layHoaDon(val:number){
    return this.http.get(this.APIUrl+'/HoaDon/hoaDon/'+val+'?idUser='+val);
  }

  layChiTietHoaDon(val:number){
    //http://localhost:5009/ChiTietHoaDon/chitiethoadon/31?id=31
    return this.http.get(this.APIUrl+'/ChiTietHoaDon/chitiethoadon/'+val+'?id='+val);
  }

  layHoaDonid(val:number){
    return this.http.get(this.APIUrl+'/HoaDon/'+val+'?id='+val);

  }

  layUser(val:number){
    return this.http.get(this.APIUrl+'/api/user/'+val);
  }

  //http://localhost:5009/SanPham/2
  layChiTietSanPham(val){
    return this.http.get(this.APIUrl+'/SanPham/'+val);
  }
}
