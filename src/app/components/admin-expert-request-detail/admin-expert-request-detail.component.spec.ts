import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExpertRequestDetailComponent } from './admin-expert-request-detail.component';

describe('AdminExpertRequestDetailComponent', () => {
  let component: AdminExpertRequestDetailComponent;
  let fixture: ComponentFixture<AdminExpertRequestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminExpertRequestDetailComponent]
    });
    fixture = TestBed.createComponent(AdminExpertRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
