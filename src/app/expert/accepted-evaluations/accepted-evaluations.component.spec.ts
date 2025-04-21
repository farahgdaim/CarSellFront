import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedEvaluationsComponent } from './accepted-evaluations.component';

describe('AcceptedEvaluationsComponent', () => {
  let component: AcceptedEvaluationsComponent;
  let fixture: ComponentFixture<AcceptedEvaluationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedEvaluationsComponent]
    });
    fixture = TestBed.createComponent(AcceptedEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
