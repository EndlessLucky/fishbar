import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSectionComponent } from './order-section.component';

describe('OrderSectionComponent', () => {
  let component: OrderSectionComponent;
  let fixture: ComponentFixture<OrderSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
