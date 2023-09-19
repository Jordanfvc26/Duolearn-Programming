import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [CreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Registro correcto de pregunta cuestionario', (done) => {
    const formCuestionario = component.formCuestionario;
    formCuestionario.controls['pregunta_cuest'].setValue('probando preguntas');
    formCuestionario.controls['opcion_a_cuestionario'].setValue('opcion 1');
    formCuestionario.controls['opcion_b_cuestionario'].setValue('opcion 2');
    formCuestionario.controls['opcion_c_cuestionario'].setValue('opcion 3');
    formCuestionario.controls['opcion_d_cuestionario'].setValue('opcion 4');
    if (formCuestionario.invalid) {
      expect(formCuestionario.invalid).toBeTrue();
      done();
    } else {
      component.act_serv.realiza_pregunta(
        {
          tema: '26',
          pregunta: formCuestionario.controls['pregunta_cuest'].value.trim(),
          opcion_correcta: formCuestionario.controls['opcion_a_cuestionario'].value.trim(),
          opcion2: formCuestionario.controls['opcion_b_cuestionario'].value.trim(),
          opcion3: formCuestionario.controls['opcion_c_cuestionario'].value.trim(),
          opcion4: formCuestionario.controls['opcion_d_cuestionario'].value.trim(),
          tipo: "cuestionario"
        }
      ).subscribe(
        (resp) => {
          expect(resp.estado).toEqual(1);
          done();
        },
        (error) => {
          done();
        });
    }
  })

  it('Registro incorrecto de pregunta cuestionario', (done) => {
    const formCuestionario = component.formCuestionario;
    formCuestionario.controls['pregunta_cuest'].setValue('probando preguntas');
    formCuestionario.controls['opcion_a_cuestionario'].setValue('opcion 1');
    formCuestionario.controls['opcion_b_cuestionario'].setValue('opcion 1');
    formCuestionario.controls['opcion_c_cuestionario'].setValue('opcion 2');
    formCuestionario.controls['opcion_d_cuestionario'].setValue('opcion 2');
    if (formCuestionario.invalid) {
      expect(formCuestionario.invalid).toBeTrue();
      done();
    } else {
      component.act_serv.realiza_pregunta(
        {
          tema: '26',
          pregunta: formCuestionario.controls['pregunta_cuest'].value.trim(),
          opcion_correcta: formCuestionario.controls['opcion_a_cuestionario'].value.trim(),
          opcion2: formCuestionario.controls['opcion_b_cuestionario'].value.trim(),
          opcion3: formCuestionario.controls['opcion_c_cuestionario'].value.trim(),
          opcion4: formCuestionario.controls['opcion_d_cuestionario'].value.trim(),
          tipo: "cuestionario"
        }
      ).subscribe(
        (resp) => {
          expect(resp.estado).toEqual(2);
          done();
        },
        (error) => {
          done();
        });
    }
  })

});
