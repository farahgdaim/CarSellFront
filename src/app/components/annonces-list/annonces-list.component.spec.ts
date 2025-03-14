import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesListComponent } from './annonces-list.component';

describe('AnnoncesListComponent', () => {
  let component: AnnoncesListComponent;
  let fixture: ComponentFixture<AnnoncesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncesListComponent]
    });
    fixture = TestBed.createComponent(AnnoncesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
