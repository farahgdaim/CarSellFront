import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedEvaluationDetailComponent } from './accepted-evaluation-detail.component';

describe('AcceptedEvaluationDetailComponent', () => {
  let component: AcceptedEvaluationDetailComponent;
  let fixture: ComponentFixture<AcceptedEvaluationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedEvaluationDetailComponent]
    });
    fixture = TestBed.createComponent(AcceptedEvaluationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
