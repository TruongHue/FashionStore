import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-xem-thuong-hieu',
  templateUrl: './xem-thuong-hieu.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrl: './xem-thuong-hieu.component.css'
})
export class XemThuongHieuComponent implements OnInit {

  @Input() thuongHieu: any;
  id: number;
  tenTH: string;
  moTa: string;

  ngOnInit(): void {
    this.id = this.thuongHieu.id;
    this.tenTH = this.thuongHieu.tenTH;
    this.moTa = this.thuongHieu.moTa;
  }
}
