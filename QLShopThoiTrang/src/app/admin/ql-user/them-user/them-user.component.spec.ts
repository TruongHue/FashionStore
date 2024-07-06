import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemUserComponent } from './them-user.component';

describe('ThemUserComponent', () => {
  let component: ThemUserComponent;
  let fixture: ComponentFixture<ThemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
