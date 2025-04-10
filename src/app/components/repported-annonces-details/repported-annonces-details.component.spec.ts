import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportedAnnoncesDetailsComponent } from './repported-annonces-details.component';

describe('RepportedAnnoncesDetailsComponent', () => {
  let component: RepportedAnnoncesDetailsComponent;
  let fixture: ComponentFixture<RepportedAnnoncesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepportedAnnoncesDetailsComponent]
    });
    fixture = TestBed.createComponent(RepportedAnnoncesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
