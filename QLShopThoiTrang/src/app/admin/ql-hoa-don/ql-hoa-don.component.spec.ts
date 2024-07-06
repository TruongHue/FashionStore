import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlHoaDonComponent } from './ql-hoa-don.component';

describe('QlHoaDonComponent', () => {
  let component: QlHoaDonComponent;
  let fixture: ComponentFixture<QlHoaDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QlHoaDonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QlHoaDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
