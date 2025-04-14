import { TestBed } from '@angular/core/testing';

import { DetailAnnonceService } from './detail-annonce.service';

describe('DetailAnnonceService', () => {
  let service: DetailAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
