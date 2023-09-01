import { TestBed } from '@angular/core/testing';

import { LenguajesService } from './lenguajes.service';
import { HttpClientModule } from '@angular/common/http';

describe('LenguajesService', () => {
  let service: LenguajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(LenguajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
