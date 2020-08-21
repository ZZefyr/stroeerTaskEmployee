import { TestBed } from '@angular/core/testing';

import { DialogValidationService } from './dialog-validation.service';

describe('DialogValidationService', () => {
  let service: DialogValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
