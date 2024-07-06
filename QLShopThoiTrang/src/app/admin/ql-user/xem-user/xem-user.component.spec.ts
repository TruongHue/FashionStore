import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemUserComponent } from './xem-user.component';

describe('XemUserComponent', () => {
  let component: XemUserComponent;
  let fixture: ComponentFixture<XemUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
