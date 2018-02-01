import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupcustomerComponent } from './setupcustomer.component';

describe('SetupcustomerComponent', () => {
  let component: SetupcustomerComponent;
  let fixture: ComponentFixture<SetupcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
