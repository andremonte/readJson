import { TestBed } from '@angular/core/testing';

import { KnowledgeassessService } from './knowledgeassess.service';

describe('KnowledgeassessService', () => {
  let service: KnowledgeassessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeassessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
