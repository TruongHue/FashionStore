import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDanhMucComponent } from './them-danh-muc.component';

describe('ThemDanhMucComponent', () => {
  let component: ThemDanhMucComponent;
  let fixture: ComponentFixture<ThemDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemDanhMucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
