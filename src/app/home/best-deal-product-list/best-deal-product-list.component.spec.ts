import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealProductListComponent } from './best-deal-product-list.component';

describe('BestDealProductListComponent', () => {
  let component: BestDealProductListComponent;
  let fixture: ComponentFixture<BestDealProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDealProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDealProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
