import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatVehiculeComponent } from './achat-vehicule.component';

describe('AchatVehiculeComponent', () => {
  let component: AchatVehiculeComponent;
  let fixture: ComponentFixture<AchatVehiculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AchatVehiculeComponent]
    });
    fixture = TestBed.createComponent(AchatVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
