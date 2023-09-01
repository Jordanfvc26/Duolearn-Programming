import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../servicios/usuarios.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule, HttpClientModule
      ],
      declarations: [LoginComponent],
      providers: [
        UsuariosService
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Registro Incorrecto', () => {
    const formRegistro = component.form_registro;
    formRegistro.controls['nombres'].setValue('luism');
    formRegistro.controls['apellidos'].setValue('perez');
    formRegistro.controls['usuario'].setValue('luism');
    formRegistro.controls['tipo'].setValue('administrador');
    formRegistro.controls['fecha_nacimiento'].setValue('1999-01-01');
    formRegistro.controls['correo'].setValue('luism@luism');
    formRegistro.controls['clave'].setValue('123');
    formRegistro.controls['confirmClave'].setValue('123');
    expect(formRegistro.invalid).toBeTrue();
  })

  it('Registro Correcto', () => {
    const formRegistro = component.form_registro;
    formRegistro.controls['nombres'].setValue('Luis');
    formRegistro.controls['apellidos'].setValue('Moreira');
    formRegistro.controls['usuario'].setValue('programador2');
    formRegistro.controls['tipo'].setValue('administrador');
    formRegistro.controls['fecha_nacimiento'].setValue('1999-01-01');
    formRegistro.controls['correo'].setValue('luism@gmail.com');
    formRegistro.controls['clave'].setValue('Papa123#');
    formRegistro.controls['confirmClave'].setValue('Papa123#');
    console.log(formRegistro);
    expect(formRegistro.valid).toBeTrue();
  })

  it('Ingreso de credenciales de login incorrecto', (done) => {
    const form_login = component.form_login;
    form_login.controls['usuario'].setValue('admin');
    form_login.controls['clave'].setValue('1234');
    component.user_service.user_login(form_login.value).subscribe(
      (resp) => {
        expect(resp.estado).toContain(0);
        done();
      },
      (error) => {
        done();
      });
  })

  it('Ingreso de credenciales de login correcto', (done) => {
    const form_login = component.form_login;
    form_login.controls['usuario'].setValue('admin');
    form_login.controls['clave'].setValue('12345');
    component.user_service.user_login(form_login.value).subscribe(
      (resp) => {
        expect(resp.estado).toContain(1);
        done();
      },
      (error) => {
        done();
      });
  })
});
