import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DsSanPhamComponent } from "./admin/ql-san-pham/ds-san-pham/ds-san-pham.component";
import { QlHoaDonComponent } from './admin/ql-hoa-don/ql-hoa-don.component';
import { QlUserComponent } from './admin/ql-user/ql-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GioHangComponent } from './user/gio-hang/gio-hang.component';
import { QlThuongHieuComponent } from './admin/ql-thuong-hieu/ql-thuong-hieu.component';
import { QlDanhMucComponent } from './admin/ql-danh-muc/ql-danh-muc.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { ThanhToanComponent } from './user/thanh-toan/thanh-toan.component';
import { HoaDonComponent } from './user/hoa-don/hoa-don.component';
import { ChiTietHoaDonComponent } from './user/chi-tiet-hoa-don/chi-tiet-hoa-don.component';
import { ChiTietSanPhamComponent } from './user/chi-tiet-san-pham/chi-tiet-san-pham.component';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component:UserComponent},
  { path: 'san-pham', component:UserComponent},
  { path: 'about', component:AboutComponent},
  { path: 'contact', component:ContactComponent},

  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},

  {path: 'user', component:UserComponent},
  {path: 'gio-hang', component:GioHangComponent},
  {path: 'user/thanh-toan', component:ThanhToanComponent},
  {path: 'user/hoa-don', component: HoaDonComponent},
  {path: 'user/chi-tiet-hoa-don', component:ChiTietHoaDonComponent},
  {path: 'donhang/:idHD', component: ChiTietHoaDonComponent },
  {path: 'sanpham/:id', component:ChiTietSanPhamComponent},

  { path: 'admin', redirectTo:'admin/ql-san-pham', pathMatch:'full' },
  { path: 'admin/ql-hoa-don', component: QlHoaDonComponent, /*canActivate: [AuthGuard], data: { roles: 'Admin' }*/  },
  { path: 'admin/ql-san-pham', component: DsSanPhamComponent, /*canActivate: [AuthGuard], data: { roles: 'Admin' } */ },
  { path: 'admin/ql-user', component: QlUserComponent, /*canActivate: [AuthGuard], data: { roles: 'Admin' } */ },
  { path: 'admin/ql-thuong-hieu', component:QlThuongHieuComponent, /*canActivate: [AuthGuard], data: { roles: 'Admin' } */},
  { path: 'admin/ql-danh-muc', component:QlDanhMucComponent, /*canActivate: [AuthGuard], data: { roles: 'Admin' } */},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
