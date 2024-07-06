import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemSanPhamComponent } from './them-san-pham.component';

describe('ThemSanPhamComponent', () => {
  let component: ThemSanPhamComponent;
  let fixture: ComponentFixture<ThemSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
