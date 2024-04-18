import { TestBed } from '@angular/core/testing';

import { ChiamateService } from './chiamate.service';

describe('ChiamateService', () => {
  let service: ChiamateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiamateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
