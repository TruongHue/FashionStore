import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DsSanPhamComponent } from "./admin/ql-san-pham/ds-san-pham/ds-san-pham.component";
import { QlHoaDonComponent } from './admin/ql-hoa-don/ql-hoa-don.component';
import { UserComponent } from './user/user.component';
import { GioHangComponent } from './user/gio-hang/gio-hang.component';
import { QlUserComponent } from './admin/ql-user/ql-user.component';
import { SharedService } from './Services/Admin/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemSanPhamComponent } from "./admin/ql-san-pham/them-san-pham/them-san-pham.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainUserComponent } from './user/main-user/main-user.component';
import { ChiTietSanPhamComponent } from './user/chi-tiet-san-pham/chi-tiet-san-pham.component';
import { QlThuongHieuComponent } from './admin/ql-thuong-hieu/ql-thuong-hieu.component';
import { QlDanhMucComponent } from './admin/ql-danh-muc/ql-danh-muc.component';
import { ToolbarModule } from "primeng/toolbar";
import { InputTextModule } from "primeng/inputtext";
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AuthService } from "./Services/auth.service";
import { ThanhToanComponent } from './user/thanh-toan/thanh-toan.component';
import { HoaDonComponent } from './user/hoa-don/hoa-don.component';
import { ChiTietHoaDonComponent } from './user/chi-tiet-hoa-don/chi-tiet-hoa-don.component';
import {SuaSanPhamComponent} from "./admin/ql-san-pham/sua-san-pham/sua-san-pham.component";
import {XemSanPhamComponent} from "./admin/ql-san-pham/xem-san-pham/xem-san-pham.component";
import {XemHoaDonComponent} from "./admin/ql-hoa-don/xem-hoa-don/xem-hoa-don.component";
import {SuaThuongHieuComponent} from "./admin/ql-thuong-hieu/sua-thuong-hieu/sua-thuong-hieu.component";
import {ThemThuongHieuComponent} from "./admin/ql-thuong-hieu/them-thuong-hieu/them-thuong-hieu.component";
import {XemThuongHieuComponent} from "./admin/ql-thuong-hieu/xem-thuong-hieu/xem-thuong-hieu.component";
import {ThemDanhMucComponent} from "./admin/ql-danh-muc/them-danh-muc/them-danh-muc.component";
import {SuaDanhMucComponent} from "./admin/ql-danh-muc/sua-danh-muc/sua-danh-muc.component";
import {XemDanhMucComponent} from "./admin/ql-danh-muc/xem-danh-muc/xem-danh-muc.component";
import {XemUserComponent} from "./admin/ql-user/xem-user/xem-user.component";
import {SuaUserComponent} from "./admin/ql-user/sua-user/sua-user.component";
import {ThemUserComponent} from "./admin/ql-user/them-user/them-user.component";
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DsSanPhamComponent,
    QlHoaDonComponent,
    QlUserComponent,
    UserComponent,
    GioHangComponent,
    LoginComponent,
    RegisterComponent,
    MainUserComponent,
    ChiTietSanPhamComponent,
    QlThuongHieuComponent,
    QlDanhMucComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ThanhToanComponent,
    HoaDonComponent,
    ChiTietHoaDonComponent,
    XemUserComponent,
    SuaUserComponent,
    ThemUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ToolbarModule,
    InputTextModule,
    ThemSanPhamComponent,
    SuaSanPhamComponent,
    XemSanPhamComponent,
    XemHoaDonComponent,
    SuaThuongHieuComponent,
    ThemThuongHieuComponent,
    XemThuongHieuComponent,
    ThemDanhMucComponent,
    SuaDanhMucComponent,
    XemDanhMucComponent,
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
