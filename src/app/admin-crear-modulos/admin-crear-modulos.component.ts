import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulosService } from '../servicios/modulos.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';

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

  constructor(
    private formBuilder: FormBuilder,
    private modulosService: ModulosService,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.crear_form_modulo();
    this.lenguajeService.listar_lenguajes(true).subscribe(resp => {
      this.arrayLenguajes = resp;
    })
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
          Validators.minLength(2),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
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

    const formData = new FormData();
    formData.append('titulo', this.moduloForm.value.titulo);
    formData.append('concepto', this.moduloForm.value.descripcion);

    this.modulosService.agregar_modulo(this.moduloForm.get('lenguaje').value, formData).subscribe({
      next: (data) => {
        if (data.estado == "1") {
          Swal.fire(
            '¡Éxito!',
            'Módulo creado correctamentes',
            'success'
          )
        }
        else {
          Swal.fire(
            '¡Error!',
            'No se pudo crear el módulo',
            'error'
          )
        }
      }
    })
  }


  //Iconos a utiizar
  iconModulo = iconos.faFolder;
}
