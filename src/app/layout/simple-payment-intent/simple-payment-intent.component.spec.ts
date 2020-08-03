import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePaymentIntentComponent } from './simple-payment-intent.component';

describe('SimplePaymentIntentComponent', () => {
  let component: SimplePaymentIntentComponent;
  let fixture: ComponentFixture<SimplePaymentIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePaymentIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePaymentIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
