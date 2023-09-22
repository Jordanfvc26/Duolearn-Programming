import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  form_clave: boolean = true;
  bolean: boolean = true;
  form_registro: FormGroup;
  form_contra: FormGroup;
  fanombre = iconos.faClosedCaptioning;
  public showPassword = false;
  public showPassword2 = false;
  public showPassword3 = false;
  tipo_usuario = "";
  iconMyProfile = iconos.faUserAlt;
  iconInformation = iconos.faInfoCircle;
  iconPassword = iconos.faLock;
  iconInfoPolicies = iconos.faInfoCircle;
  iconHidePassword = iconos.faEyeSlash; 
  iconViewPassword = iconos.faEye;
  iconEdit = iconos.faEdit;
  modoEdicion: boolean = false;
  spinnerStatus:boolean = false;
  nombreUsuario: string = "Usuario";

  constructor(
    public formulario_registro: FormBuilder,
    public formulario_password: FormBuilder,
    private route: ActivatedRoute,
    public user_Service: UsuariosService,
    public ruta: Router) {

    this.form_registro = this.formulario_registro.group({
      correo: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]]
    });

    this.form_contra = this.formulario_password.group({
      clave_actual: ['', [Validators.required]],
      confirmClave: ['', [Validators.required]],
      clave_nueva: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['"!@#$%^&*()_/+{}:<>?-]).{8,20}$/), Validators.maxLength(20)]]
    });
    //this.form_contra.get('confirmClave').setValidators([this.validarConfirmacionClave.bind(this)]);


  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  //Método que obtiene los datos del perfil y asigna los valores al form
  obtenerDatosUsuario() {
    this.spinnerStatus = false;
    this.user_Service.get_user(sessionStorage.getItem("user")).subscribe(resp => {
      this.form_registro.setValue({
        correo: resp.correo,
        usuario: resp.usuario,
        fecha_nacimiento: resp.fecha_nacimiento,
        nombres: resp.nombres,
        apellidos: resp.apellidos,
      });
      this.spinnerStatus = true;
      this.nombreUsuario = this.form_registro.value.nombres + " " + this.form_registro.value.apellidos;
    });
  }

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

  validarConfirmacionClave(control: AbstractControl): { [key: string]: any } | null {
    const clave = this.form_contra.get('clave_nueva').value;
    const confirmClave = control.value;

    if (clave != confirmClave) {
      return { 'confirmacionClaveNoCoincide': true };
    }
    return null;
  }


  soloLetras(event: any) {
    const key = event.key;
    // Verificar si la tecla presionada es una letra (a-z o A-Z)
    if (/^[a-zA-ZáéíóúÁÉÍÓÚüÜ]$/.test(key) || (key === "'" && /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]$/.test(event.key))) {
      // La tecla presionada es permitida, permitirlo
    } else if (key === "Backspace" || key === " " || /^Arrow(Up|Down|Left|Right)$/.test(key) || key === "Delete" || (event.ctrlKey && (key === "c" || key === "x" || key === "v"))) {
      // Permitir las teclas adicionales
    } else {
      // La tecla presionada no es permitida, prevenir su acción por defecto
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.spinnerStatus = true;
    this.obtenerDatosUsuario();
    this.route.data.subscribe(data => {
      this.tipo_usuario = data['adminData'].role;
      console.log(this.tipo_usuario);
    });
    setTimeout(() => {
      this.bolean = !this.bolean;
    }, 1250);
  }

  update_info() {
    this.spinnerStatus = false;
    this.user_Service.update_info(this.returnDataUpdate()).subscribe(resp => {
      if (resp.estado == 1) {
        this.spinnerStatus = true;
        this.mensaje_bien("Se ha actualizado la información de manera correcta.");
        this.obtenerDatosUsuario();
        this.modoEdicion = false;
      } else {
        this.spinnerStatus = true;
        this.mensaje_mal("No se ha podido actualizar la información. Intente otra vez.");
      }
    });
  }

  returnDataUpdate() {
    return { 'usuario_id': Number.parseInt(sessionStorage.getItem("user")), 'nombres': this.form_registro.value.nombres, 'apellidos': this.form_registro.value.apellidos, 'fecha_nacimiento': this.form_registro.value.fecha_nacimiento, 'correo': this.form_registro.value.correo }
  }

  //Método que cambia la contraseña del usuario
  update_password() {
    this.spinnerStatus = false;
    if (this.form_contra.get('clave_nueva').value == this.form_contra.get('confirmClave').value) {
      this.user_Service.update_pass(sessionStorage.getItem("user"), this.crearjson()).subscribe(resp => {
        if (resp.estado == 1) {
          this.spinnerStatus = true;
          Swal.fire({
            icon: 'success',
            title: 'Proceso exitoso',
            text: 'La contraseña se ha cambiado con éxito y se requiere volver a iniciar sesión.',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            this.close_session();
          }).finally(() => {
            this.close_session();
          })
        } else if(resp.estado==2){
          this.spinnerStatus = true;
          this.mensaje_mal("La contraseña ingresada no es igual a la contraseña actual");
        }else{
          this.spinnerStatus = true;
          this.mensaje_mal("No se ha podido modificar la contraseña. Intente otra vez.");
        }
      });
    } else {
      this.spinnerStatus = true;
      this.mensaje_mal("Las confirmación de la contraseña debe ser igual.");
    }
  }

  crearjson(): any {
    return { clave_actual: this.form_contra.value.clave_actual, clave_nueva: this.form_contra.value.clave_nueva }
  }

  //Método que muestra un mensaje de éxito
  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: 'Proceso exitoso',
      text: mensaje,
      showConfirmButton: true,
    })
  }

  //Método que muestra un mensaje de error
  mensaje_mal(mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: '¡Ha ocurrido un error!',
      text: mensaje,
      showConfirmButton: true,
    });
  }

  //Método que cierra la sesisón
  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/login");
  }

  mostrarCambioClave() {
    this.form_clave = this.form_clave ? false : true;
  }

  volver() {
    this.ruta.navigateByUrl("/dashboard");
  }

  //Método que cambia el estado de la variable que habilita los campos para editar
  habilitarEdicion(estado: boolean) {
    if (!estado)
      this.obtenerDatosUsuario();
    this.modoEdicion = estado;
    this.spinnerStatus = true;
  }

  togglePasswordVisibility(input: number) {
    if (input == 1)
      this.showPassword = !this.showPassword;
    else if (input == 2)
      this.showPassword2 = !this.showPassword2;
    else  if (input == 3)
      this.showPassword3 = !this.showPassword3;
  }

  // Método para obtener el tipo de entrada de contraseña según la visibilidad
  getPasswordInputType(input: number) {
    switch (input) {
      case 1:
        return this.showPassword ? 'text' : 'password';
      case 2:
        return this.showPassword2 ? 'text' : 'password';
      default:
        return this.showPassword3 ? 'text' : 'password';
    }
  }

  /*Método que verifica que la nueva contraseña no sea igual a la anterior*/
  newPasswordMatchesCurrent() {
    const currentPasswordControl = this.form_contra.get('clave_actual');
    const newPasswordControl = this.form_contra.get('clave_nueva');

    if (currentPasswordControl && newPasswordControl) {
      const currentPassword = currentPasswordControl.value;
      const newPassword = newPasswordControl.value;
      return currentPassword === newPassword;
    }
    return false;
  }

   /*Método que verifica que la contraseña actual no sea igual a la anterior*/
   verifyPassword(): boolean {
    const newPasswordControl = this.form_contra.get('clave_nueva');
    const confirmPasswordControl = this.form_contra.get('confirmClave');

    if (newPasswordControl && confirmPasswordControl) {
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return newPassword === confirmPassword;
    }
    return false;
  }
}
