import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinValidationComponent } from './pin-validation.component';

describe('PinValidationComponent', () => {
  let component: PinValidationComponent;
  let fixture: ComponentFixture<PinValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
