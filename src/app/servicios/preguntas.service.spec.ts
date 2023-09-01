import { TestBed } from '@angular/core/testing';

import { PreguntasService } from './preguntas.service';
import { HttpClientModule } from '@angular/common/http';

describe('PreguntasService', () => {
  let service: PreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(PreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
