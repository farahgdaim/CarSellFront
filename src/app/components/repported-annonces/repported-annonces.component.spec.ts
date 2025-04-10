import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportedAnnoncesComponent } from './repported-annonces.component';

describe('RepportedAnnoncesComponent', () => {
  let component: RepportedAnnoncesComponent;
  let fixture: ComponentFixture<RepportedAnnoncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepportedAnnoncesComponent]
    });
    fixture = TestBed.createComponent(RepportedAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
