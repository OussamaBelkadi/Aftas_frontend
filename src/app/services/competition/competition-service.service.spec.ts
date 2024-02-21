import { TestBed } from '@angular/core/testing';

import { CompetitionServiceService } from './competition-service.service';

describe('CompetitionServiceService', () => {
  let service: CompetitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
