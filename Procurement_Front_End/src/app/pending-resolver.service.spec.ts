import { TestBed } from '@angular/core/testing';

import { PendingResolverService } from './pending-resolver.service';

describe('PendingResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingResolverService = TestBed.get(PendingResolverService);
    expect(service).toBeTruthy();
  });
});
