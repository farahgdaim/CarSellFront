import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAnnoncesDetailsComponent } from './mes-annonces-details.component';

describe('MesAnnoncesDetailsComponent', () => {
  let component: MesAnnoncesDetailsComponent;
  let fixture: ComponentFixture<MesAnnoncesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesAnnoncesDetailsComponent]
    });
    fixture = TestBed.createComponent(MesAnnoncesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
