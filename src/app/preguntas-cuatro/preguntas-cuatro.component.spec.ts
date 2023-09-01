import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasCuatroComponent } from './preguntas-cuatro.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreguntasService } from '../servicios/preguntas.service';

describe('PreguntasCuatroComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [ PreguntasCuatroComponent ],
      providers: [
        PreguntasService
      ]
    })
    .compileComponents();
  });

  it('Debe existir el componente', () => {
    const fixture = TestBed.createComponent(PreguntasCuatroComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
