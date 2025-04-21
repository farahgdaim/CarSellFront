import { TestBed } from '@angular/core/testing';

import { GererMesAnnoncesService } from './gerer-mes-annonces.service';

describe('GererMesAnnoncesService', () => {
  let service: GererMesAnnoncesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererMesAnnoncesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
