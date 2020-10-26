import { TestBed } from '@angular/core/testing';

import { POService } from './po.service';

describe('POService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POService = TestBed.get(POService);
    expect(service).toBeTruthy();
  });
});
