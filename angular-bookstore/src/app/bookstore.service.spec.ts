import { TestBed } from '@angular/core/testing';

import { BookstoreService } from './bookstore.service';

describe('BookstoreService', () => {
  let service: BookstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
