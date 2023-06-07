import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreScreenComponent } from './more-screen.component';

describe('MoreScreenComponent', () => {
  let component: MoreScreenComponent;
  let fixture: ComponentFixture<MoreScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
