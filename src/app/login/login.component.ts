import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, PreloadAllModules, Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form_login: FormGroup;
  form_registro: FormGroup;
  mensaje: any;
  myItems: any;
  bol: boolean = true;
  status: string = "login";
  optionTypeUser: string = "";

  fanombre = iconos.faClosedCaptioning;

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild("container") public contenedor: ElementRef;

  constructor(public ruta: Router,
    public formulario: FormBuilder,
    public formulario_registro: FormBuilder,
    private user_service: UsuariosService,
    public activatedRoute: ActivatedRoute) {
    this.form_login = this.formulario.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.form_registro = this.formulario_registro.group({
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)]],
      usuario: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      correo: ['', [Validators.email, Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/)]],
      clave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*#?&]{8,20}$/), Validators.maxLength(20), Validators.minLength(8)]],
      confirmClave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!#%*?&]{8,20}$/), Validators.maxLength(20), Validators.minLength(8)]],
    });
    // Adjuntar validador de usuario después de construir el formulario
    this.form_registro.get('usuario').setValidators([this.validarUsuario.bind(this)]);
    this.form_registro.get('confirmClave').setValidators([this.validarConfirmacionClave.bind(this)]);

  }

  validarUsuario(control: AbstractControl): { [key: string]: any } | null {
    const nombres = this.form_registro.get('nombres').value.toLowerCase();
    const apellidos = this.form_registro.get('apellidos').value.toLowerCase();
    const usuario = control.value.toLowerCase();

    if (usuario.includes(nombres) || usuario.includes(apellidos)) {
      return { 'nombreApellidoEnUsuario': true };
    }
    return null;
  }

  validarConfirmacionClave(control: AbstractControl): { [key: string]: any } | null {
    const clave = this.form_registro.get('clave').value;
    const confirmClave = control.value;

    if (clave !== confirmClave) {
      return { 'confirmacionClaveNoCoincide': true };
    }
    return null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.bol = !this.bol;
    }, 1250);

    this.user_service.get_user({ usuario: sessionStorage.getItem("user") }).subscribe(resp => {
      if (resp.estado == 1) {
        if (resp.tipo.trim() == "administrador") {
          this.ruta.navigateByUrl("/administrador/questions/list");
        } else {
          this.ruta.navigateByUrl("/dashboard");
        }
      }
    });
  }

  login() {
    this.form_login.markAllAsTouched();
    if (this.form_login.valid) {
      this.user_service.user_login(this.form_login.value).subscribe(resp => {
        if (resp.estado == 1) {
          this.mensaje_bien(resp.mensaje);
          sessionStorage.setItem('user', resp.data);
          this.user_service.get_user({ usuario: sessionStorage.getItem("user") }).subscribe(resp => {
            if (resp.estado == 1) {
              if (resp.tipo_usuario.trim() == "administrador") {
                this.ruta.navigateByUrl("/administrador/questions/list");
              } else if (resp.tipo_usuario.trim() == "estudiante") {
                this.ruta.navigateByUrl("/elegir-lenguaje");
              }
            }
          });
        } else {
          this.mensaje_mal(resp.mensaje);
          this.ruta.navigateByUrl("/login");
        }
      });
    } else {
      this.mensaje_mal("Faltan datos");
    }

  }

  registro_user(): any {
    this.form_registro.markAllAsTouched();
    if (this.form_registro.valid) {
      const { confirmClave, ...dataWithoutConfirmClave } = this.form_registro.value;
      console.log(dataWithoutConfirmClave);
      this.user_service.user_register(this.form_registro.value).subscribe(resp => {
        let val = resp.estado;
        if (val == 1) {
          this.mensaje_bien("Usuario registrado con éxito");
          this.ruta.navigateByUrl("/login");
          this.mostrarFormLogin();
        } else {
          this.mensaje_mal("Usuario no registrado");
          this.ruta.navigateByUrl("/login");
        }
      });
    } else {
      this.mensaje_mal("Revise la información de registro");
    }
  }

  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }

  mensaje_mal(mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

  MostrarElegirLenguaje() {
    this.ruta.navigateByUrl("/elegir-lenguaje");
  }

  MostrarDashBoard() {
    this.ruta.navigateByUrl("/dashboard");
  }

  //Método que muestra el formulario de registro
  mostrarFormRegistro() {
    this.status = "registro";
  }

  //Método que muestra el formulario de registro
  mostrarFormLogin() {
    this.status = "login";
  }

  //Para deshabilitar la fecha
  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  /*Método para avanzar al siguiente paso en el stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }

  //Iconos a utilizar
  iconNextStep = iconos.faArrowRight;
  iconPreviousStep = iconos.faArrowLeft;
}
