import { TestBed } from '@angular/core/testing';

import { CbCoreService } from './cb-core.service';

describe('CbCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CbCoreService = TestBed.get(CbCoreService);
    expect(service).toBeTruthy();
  });
});
