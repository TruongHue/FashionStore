import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThuongHieuComponent } from './xem-thuong-hieu.component';

describe('XemThuongHieuComponent', () => {
  let component: XemThuongHieuComponent;
  let fixture: ComponentFixture<XemThuongHieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemThuongHieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
