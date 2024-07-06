import { Injectable } from '@angular/core';
import {Observable, catchError, retry, throwError, map} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:5009";
  readonly PhotoUrl = "http://localhost:5009/Photos";

  constructor(private http:HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',}),
  };



  //=================================Quản lý sản phẩm==================================
  layDSSanPham(){
    return this.http.get(this.APIUrl+'/SanPham/List');
  }

  themDSSanPham(val:any){
    return this.http.post(this.APIUrl+'/SanPham?&tenSP='+val.tenSP+'&moTa='+val.moTa+'&giaBan='+val.giaBan+'&soLuong='+val.soLuong+'&idThuongHieu='+val.idThuongHieu+'&idDanhMuc='+val.idDanhMuc+'&image='+val.image,val);
  }

  suaDSSanPham(val: any, idSP: number) {
    return this.http.put<any>(this.APIUrl+'/SanPham/Put/'+idSP+'?&tenSP='+val.tenSP+'&moTa='+val.moTa+'&giaBan='+val.giaBan+'&soLuong='+val.soLuong+'&idThuongHieu='+val.idThuongHieu+'&idDanhMuc='+val.idDanhMuc+'&image='+val.image,val);
  }

  xoaDSSanPham(idSP: number){
    return this.http.delete(this.APIUrl+'/SanPham/'+idSP);
  }

  timSanPham(searchString: string) {
    return this.http.get<any[]>(this.APIUrl+'/SanPham/Search?searchString='+searchString)
  }



  //==================================Quản lý hóa đơn===================================
  layHDSanPham(){
    return this.http.get<any[]>(this.APIUrl+'/HoaDon/List');
  }

  xoaHDSanPham(idHD: number){
    return this.http.delete(this.APIUrl+'/HoaDon/'+idHD);
  }

  timHD(searchString: string) {
    return this.http.get<any[]>(this.APIUrl+'/HoaDon/Search?searchString='+searchString)
  }

  sanPhamHD(idHD: number) {
    return this.http.get<any[]>(this.APIUrl+'/HoaDon/Details/'+idHD);
  }

  //==============================Quản lý danh mục======================================
  layDSDanhMuc(){
    return this.http.get(this.APIUrl+'/DanhMuc/List');
  }

  // Lấy danh sách danh mục cho dropdown
  getDanhMucList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/DanhMuc/List');
  }

  // Lấy tên danh mục theo id
  getDanhMucById(id: number): Observable<string> {
    return this.http.get<any>(this.APIUrl+'/DanhMuc/${id}').pipe(
      map(dm => dm.tenDanhMuc)
    );
  }

  timDanhMuc(searchString: string) {
    return this.http.get<any[]>(this.APIUrl+'/DanhMuc/Search?searchString='+searchString)
  }

  themDanhMuc(val){
    return this.http.post(this.APIUrl+'/DanhMuc?&tenDM='+val.tenDM+'&moTa='+val.moTa,val);
  }

  xoaDanhMuc(id: number){
    return this.http.delete(this.APIUrl+'/DanhMuc/'+id);
  }

  suaDanhMuc(val: any) {
    return this.http.put(this.APIUrl+'/DanhMuc/'+val.id, val);
  }



  //============================Quản lý thương hiệu=====================================
  layDSThuongHieu(){
    return this.http.get(this.APIUrl+'/ThuongHieu/List');
  }

  // Lấy danh sách thương hiệu cho dropdown
  getThuongHieuList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/ThuongHieu/List');
  }

  // Lấy tên thương hiệu theo id
  getThuongHieuById(id: number): Observable<string> {
    return this.http.get<any>(this.APIUrl+'/ThuongHieu/${id}').pipe(
      map(th => th.tenThuongHieu)
    );
  }

  timThuongHieu(searchString: string) {
    return this.http.get<any[]>(this.APIUrl+'/ThuongHieu/Search?searchString='+searchString)
  }

  themThuongHieu(val){
    return this.http.post(this.APIUrl+'/ThuongHieu?&tenTH='+val.tenTH+'&moTa='+val.moTa,val);
  }

  TimKiemThuongHieu(val){
    return this.http.get(this.APIUrl+'/ThuongHieu/id?id='+val);
  }

  xoaThuongHieu(id: number){
    return this.http.delete(this.APIUrl+'/ThuongHieu/'+id);
  }

  suaThuongHieu(val: any) {
    return this.http.put(this.APIUrl+'/ThuongHieu/'+val.id, val);
  }


  //===============================Quản lý User=====================================


  layDSUser(){
    return this.http.get(this.APIUrl+'/User/List');
  }

  xoaUser(idUser: number){
    return this.http.delete(this.APIUrl+'/User/'+idUser);
  }

  changeInfo(val: any) {
    const body = {newSdt: val.sdt, newTenUser: val.tenUser, newDiaChi: val.diaChi, newUserName: val.userName}
    return this.http.put(this.APIUrl+'/User/ChangeInfo/'+val.idUser+'?&newSdt='+body.newSdt+'&newTenUser='+body.newTenUser+'&newDiaChi='+body.newDiaChi+'&newUserName='+body.newUserName, body);
  }

  changePass(pass: any) {
    const body = {password: pass.password}
    console.log(body)
    return this.http.put(this.APIUrl+'/User/ChangePassword/'+pass.idUser+'?&password='+pass.password, body);
  }

  timUser(searchString: string) {
    return this.http.get<any[]>(this.APIUrl+'/User/Search?searchString='+searchString)
  }



//======================================Fashion store================================
  timKiemDSSanPhamName(val) {
    return this.http.get(this.APIUrl+'/sanPham/Name?Name='+val);
  }

  themSPGioHang(val){
    return this.http.post(this.APIUrl+'/GioHang?IDKhachhang='+val.iDKhachHang+'&idSanPham='+val.idSanPham+'&nameSanPham='+val.nameSanPham+'&priceSanPham='+val.priceSanPham+'&soLuong='+val.soLuong+'&image='+val.image,val);
  }

  laySPGioHang(val){
    return this.http.get(this.APIUrl+'/GioHang/IDKhachhang?IDKhachhang='+val);
  }

  suaSPGioHang( val: any) {
    return this.http.put(this.APIUrl+'/GioHang/Id?Id='+val.id,val);
  }

  xoaSPGiohang(val:any){
    return this.http.delete(this.APIUrl+'/GioHang/Id?Id='+val);
  }

}
