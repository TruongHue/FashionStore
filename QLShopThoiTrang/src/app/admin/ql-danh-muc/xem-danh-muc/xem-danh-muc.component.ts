import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-xem-danh-muc',
  templateUrl: './xem-danh-muc.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './xem-danh-muc.component.css'
})
export class XemDanhMucComponent implements OnInit {

  @Input() danhMuc: any;
  id: number;
  tenDM: string;
  moTa: string;

  ngOnInit(): void {
    this.id = this.danhMuc.id;
    this.tenDM = this.danhMuc.tenDM;
    this.moTa = this.danhMuc.moTa;
  }
}
