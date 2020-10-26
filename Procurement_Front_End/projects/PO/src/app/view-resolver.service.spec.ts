import { TestBed } from '@angular/core/testing';

import { ViewResolverService } from './view-resolver.service';

describe('ViewResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewResolverService = TestBed.get(ViewResolverService);
    expect(service).toBeTruthy();
  });
});
