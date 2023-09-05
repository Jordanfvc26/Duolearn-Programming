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
  iconEye = iconos.faEye;
  iconEyeSlash = iconos.faEyeSlash;
  public showPassword2 = false;
  tipo_usuario="";

  constructor(
    public formulario_registro: FormBuilder,
    public formulario_password: FormBuilder,
    private route:ActivatedRoute,
    public user_Service: UsuariosService,
    public ruta: Router) {

    this.form_registro = this.formulario_registro.group({
      correo: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['',[Validators.required]]
    });

    this.form_contra = this.formulario_password.group({
      clave_actual: ['', [Validators.required]],
      confirmClave: ['', [Validators.required]],
      clave_nueva: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*['"!@#$%^&*()_/+{}:<>?-]).{8,20}$/), Validators.maxLength(20)]]
    });
    //this.form_contra.get('confirmClave').setValidators([this.validarConfirmacionClave.bind(this)]);

    //asigna valores al form
    user_Service.get_user(sessionStorage.getItem("user")).subscribe(resp => {
      this.form_registro.setValue({
        correo: resp.correo,
        usuario: resp.usuario,
        fecha_nacimiento: resp.fecha_nacimiento,
        nombres: resp.nombres,
        apellidos: resp.apellidos,
      });

    });
  }

  validarConfirmacionClave(control: AbstractControl): { [key: string]: any } | null {
    const clave = this.form_contra.get('clave_nueva').value;
    const confirmClave = control.value;

    if (clave != confirmClave) {
      return { 'confirmacionClaveNoCoincide': true };
    }
    return null;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tipo_usuario = data['adminData'].role;
      console.log(this.tipo_usuario);
    });
    setTimeout(() => {
      this.bolean = !this.bolean;
    }, 1250);
  }

  update_info() {
    this.user_Service.update_info(this.returnDataUpdate()).subscribe(resp => {
      if (resp.estado == 1) {
        this.mensaje_bien("Se ha modificado");
        setTimeout(() => {
          window.location.reload();
        })      
      } else {
        this.mensaje_mal("No se ha modificado");
      }
    });
  }

     //Ojo para la contraseña
     togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }

  returnDataUpdate(){
    return {'usuario_id':Number.parseInt(sessionStorage.getItem("user")),'nombres':this.form_registro.value.nombres,'apellidos':this.form_registro.value.apellidos, 'fecha_nacimiento':this.form_registro.value.fecha_nacimiento, 'correo':this.form_registro.value.correo}
  }

  update_password(){
    if(this.form_contra.get('clave_nueva').value == this.form_contra.get('confirmClave').value){
      this.user_Service.update_pass(sessionStorage.getItem("user"),this.crearjson()).subscribe(resp=>{
        if (resp.estado == 1) {
          this.mensaje_bien("SE HA MODIFICADO");
          setTimeout(() => {
            window.location.reload();
          })
        } else {
          this.mensaje_mal("NO SE HA MODIFICADO");
        }
      });
    }else{
      this.mensaje_mal("LAS CONTRASEÑAS NO COINCIDEN");
    }
  }

  crearjson():any{
    return {clave_actual:this.form_contra.value.clave_actual, clave_nueva:this.form_contra.value.clave_nueva}
  }

  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: true,
      timer: 2000
    })
  }

  mensaje_mal(mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      showConfirmButton: true,
      timer: 1500
    });
  }

  mostrarCambioClave() {
    this.form_clave = this.form_clave ? false : true;
  }



}
