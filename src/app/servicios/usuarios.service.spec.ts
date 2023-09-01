import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './usuarios.service';
import { HttpClientModule } from '@angular/common/http';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
