import { TestBed } from '@angular/core/testing';

import { Po3Service } from './po3.service';

describe('Po3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Po3Service = TestBed.get(Po3Service);
    expect(service).toBeTruthy();
  });
});
