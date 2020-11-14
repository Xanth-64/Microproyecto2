import { TestBed } from '@angular/core/testing';

import { FavCrudService } from './fav-crud.service';

describe('FavCrudService', () => {
  let service: FavCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
