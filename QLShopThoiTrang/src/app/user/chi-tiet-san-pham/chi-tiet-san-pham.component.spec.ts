import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietSanPhamComponent } from './chi-tiet-san-pham.component';

describe('ChiTietSanPhamComponent', () => {
  let component: ChiTietSanPhamComponent;
  let fixture: ComponentFixture<ChiTietSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiTietSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
