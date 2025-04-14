import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionExpertComponent } from './selection-expert.component';

describe('SelectionExpertComponent', () => {
  let component: SelectionExpertComponent;
  let fixture: ComponentFixture<SelectionExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionExpertComponent]
    });
    fixture = TestBed.createComponent(SelectionExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
