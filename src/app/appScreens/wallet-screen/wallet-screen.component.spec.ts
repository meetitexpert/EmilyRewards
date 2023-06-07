import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletScreenComponent } from './wallet-screen.component';

describe('WalletScreenComponent', () => {
  let component: WalletScreenComponent;
  let fixture: ComponentFixture<WalletScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
