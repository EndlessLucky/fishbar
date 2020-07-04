import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductsSectionComponent } from './popular-products-section.component';

describe('PopularProductsSectionComponent', () => {
  let component: PopularProductsSectionComponent;
  let fixture: ComponentFixture<PopularProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
