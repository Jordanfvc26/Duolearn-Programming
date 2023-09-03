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

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private modulosService: ModulosService,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.crear_form_modulo();
    this.lenguajeService.listar_lenguajes(true).subscribe(resp => {
      this.arrayLenguajes = resp;
    })
  }

  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
    console.log(event.target.files);
    this.img1 = event.target.files[0];
  }

  //Método que crea el formulario
  crear_form_modulo() {
    this.moduloForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(2),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
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
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
    })
  }

  //Método que manda a guardar el módulo
  registrarModulo() {
   this.moduloForm.markAllAsTouched();
    if (this.moduloForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.moduloForm.value.titulo);
      formData.append('concepto', this.moduloForm.value.descripcion);
      formData.append('images', this.img1);
      this.modulosService.agregar_modulo(this.moduloForm.get('lenguaje').value, formData).subscribe({
        next: (data) => {
          if (data.estado == "1") {
            Swal.fire(
              '¡Éxito!',
              'Módulo creado correctamentes',
              'success'
            )
            this.ruta.navigate(['/administrador/modulos/list']);
          }
          else if (data.estado == "2") {
            Swal.fire(
              '¡Error!',
              'Ya existe el módulo dentro del lenguaje seleccionado',
              'error'
            )
          }else{
            Swal.fire(
              '¡Error!',
              'No se pudo crear el módulo',
              'error'
            )
          }
        },
        error: (error) => {
          Swal.fire(
            '¡Error!',
            'No se pudo crear el módulo',
            'error'
          )
        }
      })
    }else{
      Swal.fire(
        '¡Error!',
        'No cumple con los campos requeridos',
        'error'
      )
    }
  }


  //Iconos a utiizar
  iconModulo = iconos.faFolder;
}
