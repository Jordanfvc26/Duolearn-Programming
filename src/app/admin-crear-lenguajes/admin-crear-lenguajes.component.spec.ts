import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearLenguajesComponent } from './admin-crear-lenguajes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LenguajesService } from '../servicios/lenguajes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('(1) TEST de AdminCrearLenguajesComponent', () => {
  let component: AdminCrearLenguajesComponent;
  let fixture: ComponentFixture<AdminCrearLenguajesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [ AdminCrearLenguajesComponent ],
      providers: [
        LenguajesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearLenguajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el componente', () => {
    const fixture = TestBed.createComponent(AdminCrearLenguajesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe ser formulario valido', () => {
    const fixture = TestBed.createComponent(AdminCrearLenguajesComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const form= app.languageForm;
    expect(form.invalid).toBeTrue();
  })

  it('Ingreso de lenguaje erroneo', () => {
    component.crear_form_lenguaje();
    const fromLenguaje = component.languageForm;
    fromLenguaje.controls['titulo'].setValue('luism');
    fromLenguaje.controls['portada'].setValue('perez');
    fromLenguaje.controls['descripcion'].setValue('perez');
    expect(fromLenguaje.invalid).toBeTrue();
  })

  it('Ingreso de lenguaje correcto', () => {
    component.crear_form_lenguaje();
    const fromLenguaje = component.languageForm;
    fromLenguaje.controls['titulo'].setValue('luism');
    fromLenguaje.controls['portada'].setValue('perez');
    fromLenguaje.controls['descripcion'].setValue('Descripcion de lenguaje');
    expect(fromLenguaje.valid).toBeTrue();
  })
});
