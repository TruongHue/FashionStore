import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaUserComponent } from './sua-user.component';

describe('SuaUserComponent', () => {
  let component: SuaUserComponent;
  let fixture: ComponentFixture<SuaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
