import { TestBed } from '@angular/core/testing';

import { Invoice3Service } from './invoice3.service';

describe('Invoice3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Invoice3Service = TestBed.get(Invoice3Service);
    expect(service).toBeTruthy();
  });
});
