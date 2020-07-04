import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealSectionComponent } from './best-deal-section.component';

describe('BestDealSectionComponent', () => {
  let component: BestDealSectionComponent;
  let fixture: ComponentFixture<BestDealSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDealSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDealSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
