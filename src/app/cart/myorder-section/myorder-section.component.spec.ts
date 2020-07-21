import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderSectionComponent } from './myorder-section.component';

describe('MyorderSectionComponent', () => {
  let component: MyorderSectionComponent;
  let fixture: ComponentFixture<MyorderSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
