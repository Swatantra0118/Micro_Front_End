import { TestBed } from '@angular/core/testing';

import { NetworkrequestService } from './networkrequest.service';

describe('NetworkrequestService', () => {
  let service: NetworkrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
