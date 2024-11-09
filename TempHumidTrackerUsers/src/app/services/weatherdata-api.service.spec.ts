import { TestBed } from '@angular/core/testing';

import { WeatherdataApiService } from './weatherdata-api.service';

describe('WeatherdataApiService', () => {
  let service: WeatherdataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherdataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
