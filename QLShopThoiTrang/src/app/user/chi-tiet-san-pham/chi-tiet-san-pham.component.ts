import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chi-tiet-san-pham',
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.css']
})
export class ChiTietSanPhamComponent implements OnInit {
  sanPham: any; // Variable to hold product details
  idKhachHang:number;


  constructor(private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    // Retrieve the idSP parameter from the route
    const idSP = +this.route.snapshot.paramMap.get('id');

    // Call your service method to fetch product details based on idSP
    this.service.layChiTietSanPham(idSP).subscribe(
      (data: any) => {
        this.sanPham = data; // Assign retrieved product details to sanPham variable
      },
      error => {
        console.error('Error fetching product details:', error);
        // Handle error if needed
      }
    );
  }

  // themGioHang(sanPham) {
  //   const val = {
  //     idUser: this.idKhachHang,
  //     idSP: sanPham.idSP,
  //     gia: sanPham.giaBan,
  //     soLuong: 1,
  //     image: sanPham.image,
  //     tongTien: 1
  //   };

  //   this.service.themSPGioHang(val).subscribe(
  //     (result: any) => {
  //       this.reLoadDSanPham(); // Reload the product list after successfully adding to cart
  //     });
  // }

}
