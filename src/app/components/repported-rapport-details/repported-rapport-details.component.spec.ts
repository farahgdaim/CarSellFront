import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportedRapportDetailsComponent } from './repported-rapport-details.component';

describe('RepportedRapportDetailsComponent', () => {
  let component: RepportedRapportDetailsComponent;
  let fixture: ComponentFixture<RepportedRapportDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepportedRapportDetailsComponent]
    });
    fixture = TestBed.createComponent(RepportedRapportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
