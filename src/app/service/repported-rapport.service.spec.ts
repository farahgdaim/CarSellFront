import { TestBed } from '@angular/core/testing';

import { RepportedRapportService } from './repported-rapport.service';

describe('RepportedRapportService', () => {
  let service: RepportedRapportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepportedRapportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
