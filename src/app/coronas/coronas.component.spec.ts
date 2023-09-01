import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronasComponent } from './coronas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { EstadisticasService } from '../servicios/estadisticas.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import { TemasService } from '../servicios/temas.service';

describe('CoronasComponent', () => {
  let component: CoronasComponent;
  let fixture: ComponentFixture<CoronasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [ CoronasComponent ],
      providers: [
        EstadisticasService,
        LenguajesService,
        TemasService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
