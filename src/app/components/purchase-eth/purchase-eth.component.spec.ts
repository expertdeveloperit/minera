import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEthComponent } from './purchase-eth.component';

describe('PurchaseEthComponent', () => {
  let component: PurchaseEthComponent;
  let fixture: ComponentFixture<PurchaseEthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
