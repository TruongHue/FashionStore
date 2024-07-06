import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemDanhMucComponent } from './xem-danh-muc.component';

describe('XemDanhMucComponent', () => {
  let component: XemDanhMucComponent;
  let fixture: ComponentFixture<XemDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemDanhMucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
