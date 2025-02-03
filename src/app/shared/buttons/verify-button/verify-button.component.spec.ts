import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyButtonComponent } from './verify-button.component';

describe('VerifyButtonComponent', () => {
  let component: VerifyButtonComponent;
  let fixture: ComponentFixture<VerifyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyButtonComponent]
    });
    fixture = TestBed.createComponent(VerifyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
