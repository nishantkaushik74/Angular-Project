import { TestBed } from '@angular/core/testing';

import { QuestionScreenService } from './question-screen.service';

describe('QuestionScreenService', () => {
  let service: QuestionScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
