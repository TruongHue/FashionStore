import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaThuongHieuComponent } from './sua-thuong-hieu.component';

describe('SuaThuongHieuComponent', () => {
  let component: SuaThuongHieuComponent;
  let fixture: ComponentFixture<SuaThuongHieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaThuongHieuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
