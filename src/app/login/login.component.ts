import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, PreloadAllModules, Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { MatStepper } from '@angular/material/stepper';
import { AdministradorComponent } from '../administrador/administrador.component';

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
  public showPassword = false;
  spinnerStatus: boolean = false;
  isLinear: boolean = true;

  fanombre = iconos.faClosedCaptioning;

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild("container") public contenedor: ElementRef;

  constructor(
    public ruta: Router,
    public formulario: FormBuilder,
    public formulario_registro: FormBuilder,
    public user_service: UsuariosService,
    public activatedRoute: ActivatedRoute) {
    this.form_login = this.formulario.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.form_registro = this.formulario_registro.group({
      nombres: ['',
        [
          Validators.required,
          Validators.pattern(/^(?!.*\s{2,})(?!^\s)(?=.*[a-zA-Z])[a-zA-Z0-9\s.-]*[a-zA-Z0-9]$/),
          Validators.minLength(3)
        ]
      ],
      apellidos: ['',
        [
          Validators.required,
          Validators.pattern(/^(?!.*\s{2,})(?!^\s)(?=.*[a-zA-Z])[a-zA-Z0-9\s.-]*[a-zA-Z0-9]$/),
          Validators.minLength(3),
        ]
      ],
      usuario: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9._-]+$/)
        ]
      ],
      tipo: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      correo: ['', [Validators.email, Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/)]],
      clave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['"!@#$%^&*()_/+{}:<>?-]).{8,20}$/), Validators.maxLength(20), Validators.minLength(8)]],
      confirmClave: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['"!@#$%^&*()_/+{}:<>?-]).{8,20}$/), Validators.maxLength(20), Validators.minLength(8)]],
    });
    this.aggValidatorUser();
    this.form_registro.get('confirmClave').setValidators([this.validarConfirmacionClave.bind(this)]);
  }

  aggValidatorUser() {
    // Obtén una referencia al control de usuario
    const usuarioControl = this.form_registro.get('usuario');
    // Obtiene los validadores actuales (si los hay)
    const currentValidators = usuarioControl.validator;
    // Crea un nuevo conjunto de validadores que incluye los existentes y el nuevo validador
    const newValidators = [currentValidators, this.validarUsuario.bind(this)];
    // Establece los nuevos validadores en el control
    usuarioControl.setValidators(newValidators);
    usuarioControl.updateValueAndValidity();

    this.form_registro.controls['nombres'].valueChanges.subscribe(
      () => {
        this.form_registro.controls['usuario'].setValue("")
        this.form_registro.controls['usuario'].updateValueAndValidity();
      }
    );
    this.form_registro.controls['apellidos'].valueChanges.subscribe(
      () => {
        this.form_registro.controls['usuario'].setValue("")
        this.form_registro.controls['usuario'].updateValueAndValidity();
      }
    );
  }

  validarUsuario(control: AbstractControl): { [key: string]: any } | null {
    const nombres = this.form_registro.get('nombres').value.toLowerCase();
    const apellidos = this.form_registro.get('apellidos').value.toLowerCase();
    const usuario = control.value.toLowerCase();
    if (nombres == "" || apellidos == "") {
      return null;
    }

    if (usuario == "") {
      return null;
    }

    if (nombres.includes(" ")) {
      let varNom = nombres.split(" ");
      for (let index = 0; index < varNom.length; index++) {
        if (usuario.includes(varNom[index])) {
          return { 'nombreApellidoEnUsuario': true };
        }
      }
    } else {
      if (usuario.includes(nombres)) {
        return { 'nombreApellidoEnUsuario': true };
      }
    }

    if (apellidos.includes(" ")) {
      let varApe = apellidos.split(" ");
      for (let index = 0; index < varApe.length; index++) {
        if (usuario.includes(varApe[index])) {
          return { 'nombreApellidoEnUsuario': true };
        }
      }
    } else {
      if (usuario.includes(apellidos)) {
        return { 'nombreApellidoEnUsuario': true };
      }
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
    this.spinnerStatus = true;
    setTimeout(() => {
      this.bol = !this.bol;
    }, 1250);

    if (sessionStorage.getItem("user")) {
      this.user_service.get_user(sessionStorage.getItem("user")).subscribe(resp => {
        if (resp.estado == 1) {
          if (resp.tipo.trim() == "administrador") {
            this.ruta.navigateByUrl("/administrador");
          } else {
            this.ruta.navigateByUrl("/dashboard");
          }
        }
      });
    }
  }

  login() {
    this.spinnerStatus = false;
    this.form_login.markAllAsTouched();
    if (this.form_login.valid) {
      this.user_service.user_login(this.form_login.value).subscribe(resp => {
        if (resp.estado == 1) {
          this.mensaje_bien(resp.mensaje);
          sessionStorage.setItem('user', resp.data);
          this.user_service.get_user(sessionStorage.getItem("user")).subscribe(resp => {
            if (resp.estado == 1) {
              this.spinnerStatus = true;
              if (resp.tipo_usuario.trim() == "administrador") {
                this.ruta.navigateByUrl("/administrador");
                sessionStorage.setItem('userType', "administrador")
              } else if (resp.tipo_usuario.trim() == "estudiante") {
                this.ruta.navigateByUrl("/elegir-lenguaje");
              }
              else {
                AdministradorComponent.userType = "docente";
                this.ruta.navigateByUrl("/administrador");
              }
            }
          });
        } else {
          this.spinnerStatus = true;
          this.mensaje_mal(resp.mensaje);
          this.ruta.navigateByUrl("/login");
        }
      });
    } else {
      this.spinnerStatus = true;
      this.mensaje_mal("Faltan datos");
    }

  }

  registro_user(): any {
    this.spinnerStatus = false;
    this.form_registro.markAllAsTouched();
    if (this.form_registro.valid) {
      const { confirmClave, ...dataWithoutConfirmClave } = this.form_registro.value;
      this.user_service.user_register(this.getForm()).subscribe(resp => {
        if (resp.estado == 1) {
          this.spinnerStatus = true;
          this.mensaje_bien("Usuario registrado con éxito");
          this.ruta.navigateByUrl("/login");
          this.mostrarFormLogin();
        } else if (resp.estado == 2) {
          this.spinnerStatus = true;
          this.mensaje_mal("El usuario ya se encuentra registrado");
        }
        else {
          this.spinnerStatus = true;
          this.mensaje_mal("Usuario no registrado");
        }
      });
    } else {
      this.spinnerStatus = true;
      this.mensaje_mal("Revise la información de registro");
    }
  }

  //Obtiene los datos para registrar el usuario
  getForm() {
    let body: any = {
      nombres: this.form_registro.get('nombres')?.value,
      apellidos: this.form_registro.get('apellidos')?.value,
      usuario: this.form_registro.get('usuario')?.value,
      tipo: this.form_registro.get('tipo')?.value,
      fecha_nacimiento: this.form_registro.get('fecha_nacimiento')?.value,
      correo: this.form_registro.get('correo')?.value,
      clave: this.form_registro.get('clave')?.value,
    }
    return body;
  }

  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#05C458'
    })
  }

  mensaje_mal(mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#FF4136'
    })
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
    this.form_login.controls['usuario'].setValue("");
    this.form_login.controls['clave'].setValue("");
    this.form_login.updateValueAndValidity()
  }

  //Método que muestra el formulario de registro
  mostrarFormLogin() {
    this.status = "login";
    this.form_registro.controls['nombres'].setValue("");
    this.form_registro.controls['apellidos'].setValue("");
    this.form_registro.controls['usuario'].setValue("");
    this.form_registro.controls['tipo'].setValue("");
    this.form_registro.controls['correo'].setValue("");
    this.form_registro.controls['fecha_nacimiento'].setValue("");
    this.form_registro.controls['clave'].setValue("");
    this.form_registro.controls['confirmClave'].setValue("");
    this.form_registro.updateValueAndValidity();
  }

  //Para deshabilitar la fecha
  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear() - 5;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear() - 100;
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  soloLetras(event: any) {
    const key = event.key;
    // Verificar si la tecla presionada es una letra (a-z o A-Z)
    // Verificar si la tecla presionada es una letra (a-z o A-Z)
    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ]$/.test(key) || (key === "'" && /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]$/.test(event.key))) {
      // La tecla presionada es permitida, permitirla
    } else if (key === "Backspace" || key === " " || key === "Tab" || /^Arrow(Up|Down|Left|Right)$/.test(key) || key === "Delete" || (event.ctrlKey && (key === "c" || key === "x" || key === "v"))) {
      // Permitir las teclas adicionales
    } else {
      // La tecla presionada no es permitida, prevenir su acción por defecto
      event.preventDefault();
    }

  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  /*Método para avanzar al siguiente paso en el stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }


  isFechaInvalida(): boolean {
    const fechaNacimientoControl = this.form_registro.get('fecha_nacimiento');
    if (fechaNacimientoControl?.value) {
      const fechaNacimiento = new Date(fechaNacimientoControl?.value);
      const fechaActual = new Date();
      fechaActual.setFullYear(fechaActual.getFullYear() - 5)
      fechaActual.setHours(0, 0, 0, 0);
      const fechaMinima = new Date();
      const year = fechaMinima.getFullYear() - 100;
      fechaMinima.setFullYear(fechaMinima.getFullYear() - 100)
      fechaMinima.setHours(0, 0, 0, 0);
      return (fechaNacimiento > fechaActual) || (fechaNacimiento < fechaMinima);
    }
    return false;
  }

  //Ojo para la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  //Método que elimina los espcios y compara si no hay texto ingresado
  compararTextoVacio(campo: string) {
    if (this.form_registro.get(campo)?.value.trim() == "")
      return true;
    else
      return false;
  }

  validaFirstStepper() {
    if (this.compararTextoVacio("nombres") || this.isFechaInvalida() || this.form_registro.get("nombres").invalid || this.compararTextoVacio("apellidos") || this.form_registro.get("apellidos").invalid || this.form_registro.get("fecha_nacimiento").invalid || this.form_registro.get("tipo").invalid) {
      this.isLinear = true;
      return true;
    }
    else {
      this.isLinear = false;
      return false;
    }
  }

  //Iconos a utilizar
  iconNextStep = iconos.faArrowRight;
  iconPreviousStep = iconos.faArrowLeft;
  iconEye = iconos.faEye;
  iconEyeSlash = iconos.faEyeSlash;
}
