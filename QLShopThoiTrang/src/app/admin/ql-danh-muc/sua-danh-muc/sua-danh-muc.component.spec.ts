import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaDanhMucComponent } from './sua-danh-muc.component';

describe('SuaDanhMucComponent', () => {
  let component: SuaDanhMucComponent;
  let fixture: ComponentFixture<SuaDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaDanhMucComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
