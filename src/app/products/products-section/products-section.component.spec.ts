import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSectionComponent } from './products-section.component';

describe('ProductsSectionComponent', () => {
  let component: ProductsSectionComponent;
  let fixture: ComponentFixture<ProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
