import { TestBed } from '@angular/core/testing';

import { Po2Service } from './po2.service';

describe('Po2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Po2Service = TestBed.get(Po2Service);
    expect(service).toBeTruthy();
  });
});
