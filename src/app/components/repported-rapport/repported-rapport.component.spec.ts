import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportedRapportComponent } from './repported-rapport.component';

describe('RepportedRapportComponent', () => {
  let component: RepportedRapportComponent;
  let fixture: ComponentFixture<RepportedRapportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepportedRapportComponent]
    });
    fixture = TestBed.createComponent(RepportedRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
