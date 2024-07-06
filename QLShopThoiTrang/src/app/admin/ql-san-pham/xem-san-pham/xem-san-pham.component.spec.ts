import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemSanPhamComponent } from './xem-san-pham.component';

describe('XemSanPhamComponent', () => {
  let component: XemSanPhamComponent;
  let fixture: ComponentFixture<XemSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
