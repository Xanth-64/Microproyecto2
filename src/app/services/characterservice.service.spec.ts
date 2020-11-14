import { TestBed } from '@angular/core/testing';

import { CharacterserviceService } from './characterservice.service';

describe('CharacterserviceService', () => {
  let service: CharacterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
