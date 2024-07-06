import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDanhMucComponent } from './ql-danh-muc.component';

describe('QlDanhMucComponent', () => {
  let component: QlDanhMucComponent;
  let fixture: ComponentFixture<QlDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QlDanhMucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QlDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
