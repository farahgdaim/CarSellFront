import { TestBed } from '@angular/core/testing';

import { RepportedAnnoncesService } from './repported-annonces.service';

describe('RepportedAnnoncesService', () => {
  let service: RepportedAnnoncesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepportedAnnoncesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
