import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlThuongHieuComponent } from './ql-thuong-hieu.component';

describe('QlThuongHieuComponent', () => {
  let component: QlThuongHieuComponent;
  let fixture: ComponentFixture<QlThuongHieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QlThuongHieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QlThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
