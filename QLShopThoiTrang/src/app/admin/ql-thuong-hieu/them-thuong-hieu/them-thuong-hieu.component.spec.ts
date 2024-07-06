import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemThuongHieuComponent } from './them-thuong-hieu.component';

describe('ThemThuongHieuComponent', () => {
  let component: ThemThuongHieuComponent;
  let fixture: ComponentFixture<ThemThuongHieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemThuongHieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
