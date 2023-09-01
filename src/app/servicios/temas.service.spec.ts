import { TestBed } from '@angular/core/testing';

import { TemasService } from './temas.service';
import { HttpClientModule } from '@angular/common/http';

describe('TemasService', () => {
  let service: TemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(TemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
