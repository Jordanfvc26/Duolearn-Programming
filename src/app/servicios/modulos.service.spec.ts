import { TestBed } from '@angular/core/testing';

import { ModulosService } from './modulos.service';
import { HttpClientModule } from '@angular/common/http';

describe('ModulosService', () => {
  let service: ModulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ModulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
