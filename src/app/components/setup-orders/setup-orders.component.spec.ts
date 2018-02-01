import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupOrdersComponent } from './setup-orders.component';

describe('SetupOrdersComponent', () => {
  let component: SetupOrdersComponent;
  let fixture: ComponentFixture<SetupOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
