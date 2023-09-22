import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulosService } from '../servicios/modulos.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-crear-modulos',
  templateUrl: './admin-crear-modulos.component.html',
  styleUrls: ['./admin-crear-modulos.component.css', '../admin-crear-lenguajes/admin-crear-lenguajes.component.css']
})
export class AdminCrearModulosComponent implements OnInit {

  //Variables
  moduloForm: FormGroup;
  optionLenguajeSelected: string = "";
  arrayLenguajes: any[] = [];
  img1:any;
  spinnerStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private modulosService: ModulosService,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.spinnerStatus = true;
    this.crear_form_modulo();
    this.listar_lenguajes();
  }

  listar_lenguajes(){
    this.spinnerStatus = false;
    this.lenguajeService.listar_lenguajes(true).subscribe(resp => {
      this.arrayLenguajes = resp;
      this.spinnerStatus = true;
    })
  }

  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
    this.img1 = event.target.files[0];
  }

  //Método que crea el formulario
  crear_form_modulo() {
    this.moduloForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(1),
          Validators.required,
        ]
      ],
      icono: ['',
        [
          Validators.required,
        ]
      ],
      lenguaje: ['',
        [
          Validators.required,
        ]
      ],
      descripcion: ['',
        [
          Validators.minLength(10),
          Validators.required,
        ]
      ],
    })
  }

  //Método que manda a guardar el módulo
  registrarModulo() {
    this.spinnerStatus = false;
   this.moduloForm.markAllAsTouched();
    if (this.moduloForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.moduloForm.value.titulo);
      formData.append('concepto', this.moduloForm.value.descripcion);
      formData.append('images', this.img1);
      this.modulosService.agregar_modulo(this.moduloForm.get('lenguaje').value, formData).subscribe({
        next: (data) => {
          if (data.estado == "1") {
            this.spinnerStatus = true;
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Módulo creado correctamente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#05C458'
            })
            this.ruta.navigate(['/administrador/modulos/list']);
          }
          else if (data.estado == "2") {
            this.spinnerStatus = true;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ya existe el módulo dentro del lenguaje seleccionado',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#FF4136'
            })
          }else{
            this.spinnerStatus = true;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el módulo',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#FF4136'
            })
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el módulo',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#FF4136'
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No cumple con los campos requeridos',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#FF4136'
      })
    }
  }

  //Método que compara que no hayan inputs con espacios (vacios)
  compararTextoVacio(campo: string) {
    if (this.moduloForm.get(campo)?.value.trim() === "")
      return true;
    else
      return false;
  }


  //Iconos a utiizar
  iconModulo = iconos.faFolder;
}
