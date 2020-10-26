import { TestBed } from '@angular/core/testing';

import { EditResolverService } from './edit-resolver.service';

describe('EditResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditResolverService = TestBed.get(EditResolverService);
    expect(service).toBeTruthy();
  });
});
