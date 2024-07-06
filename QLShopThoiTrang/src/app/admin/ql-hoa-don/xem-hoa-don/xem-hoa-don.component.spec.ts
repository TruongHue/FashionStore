import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemHoaDonComponent } from './xem-hoa-don.component';

describe('XemHoaDonComponent', () => {
  let component: XemHoaDonComponent;
  let fixture: ComponentFixture<XemHoaDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemHoaDonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemHoaDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
