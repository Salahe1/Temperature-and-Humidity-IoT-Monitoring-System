import { TestBed } from '@angular/core/testing';

import { ThresholdApiService } from './threshold-api.service';

describe('ThresholdApiService', () => {
  let service: ThresholdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThresholdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
