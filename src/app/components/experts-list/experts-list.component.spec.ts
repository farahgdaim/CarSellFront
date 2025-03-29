import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsListComponent } from './experts-list.component';

describe('ExpertsListComponent', () => {
  let component: ExpertsListComponent;
  let fixture: ComponentFixture<ExpertsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertsListComponent]
    });
    fixture = TestBed.createComponent(ExpertsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
