import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearModulosComponent } from './admin-crear-modulos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LenguajesService } from '../servicios/lenguajes.service';
import { By } from '@angular/platform-browser';

describe('AdminCrearModulosComponent', () => {

  let component: AdminCrearModulosComponent;
  let fixture: ComponentFixture<AdminCrearModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, 
        HttpClientModule
      ],
      declarations: [ AdminCrearModulosComponent ],
      providers: [
        LenguajesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  

  it('Datos incorrectos', () => {
    var form=component.moduloForm;
    form.controls['titulo'].setValue('Hola');
    form.controls['lenguaje'].setValue('Hola');
    form.controls['descripcion'].setValue('Hola');
    expect(form.invalid).toBeTrue();
  })
});
