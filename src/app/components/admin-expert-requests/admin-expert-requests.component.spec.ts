import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExpertRequestsComponent } from './admin-expert-requests.component';

describe('AdminExpertRequestsComponent', () => {
  let component: AdminExpertRequestsComponent;
  let fixture: ComponentFixture<AdminExpertRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminExpertRequestsComponent]
    });
    fixture = TestBed.createComponent(AdminExpertRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
