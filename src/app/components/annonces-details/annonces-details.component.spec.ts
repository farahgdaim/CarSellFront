import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesDetailsComponent } from './annonces-details.component';

describe('AnnoncesDetailsComponent', () => {
  let component: AnnoncesDetailsComponent;
  let fixture: ComponentFixture<AnnoncesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncesDetailsComponent]
    });
    fixture = TestBed.createComponent(AnnoncesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
