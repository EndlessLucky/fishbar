import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealProductItemComponent } from './deal-product-item.component';

describe('DealProductItemComponent', () => {
  let component: DealProductItemComponent;
  let fixture: ComponentFixture<DealProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
