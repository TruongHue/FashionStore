import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSanPhamComponent } from './ds-san-pham.component';

describe('DsSanPhamComponent', () => {
  let component: DsSanPhamComponent;
  let fixture: ComponentFixture<DsSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DsSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
