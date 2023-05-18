import { TestBed } from '@angular/core/testing';

import { MainImagesService } from './main-images.service';

describe('MainImagesService', () => {
  let service: MainImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
