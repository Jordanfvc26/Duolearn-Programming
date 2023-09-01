import { TestBed } from '@angular/core/testing';

import { EstadisticasService } from './estadisticas.service';
import { HttpClientModule } from '@angular/common/http';

describe('EstadisticasService', () => {
  let service: EstadisticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(EstadisticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
