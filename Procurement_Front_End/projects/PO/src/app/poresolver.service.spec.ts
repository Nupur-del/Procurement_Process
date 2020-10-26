import { TestBed } from '@angular/core/testing';

import { POResolverService } from './poresolver.service';

describe('POResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POResolverService = TestBed.get(POResolverService);
    expect(service).toBeTruthy();
  });
});
