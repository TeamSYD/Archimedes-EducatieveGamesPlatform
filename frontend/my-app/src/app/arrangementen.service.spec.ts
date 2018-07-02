import { TestBed, inject } from '@angular/core/testing';

import { ArrangementenService } from './arrangementen.service';

describe('ArrangementenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrangementenService]
    });
  });

  it('should be created', inject([ArrangementenService], (service: ArrangementenService) => {
    expect(service).toBeTruthy();
  }));
});
