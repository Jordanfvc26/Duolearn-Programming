import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulosService } from '../servicios/modulos.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TemasService } from '../servicios/temas.service';

@Component({
  selector: 'app-admin-edit-modulos',
  templateUrl: './admin-edit-modulos.component.html',
  styleUrls: ['../admin-crear-lenguajes/admin-crear-lenguajes.component.css']
})
export class AdminEditModulosComponent implements AfterViewInit, AfterContentInit {

  moduloForm: FormGroup;
  moduleId: any;
  img1: any;
  infoModulo: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ruta: Router,
    private temaService: TemasService,
    private modulosService: ModulosService
  ) {
    this.crear_form_modulo();
  }

  ngAfterContentInit(): void {
    this.route.paramMap.subscribe(params => {
      this.moduleId = Number.parseInt(params.get('id'));
      this.cargaInfoModulo();
    });
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.moduleId = Number.parseInt(params.get('id'));
      this.cargaInfoModulo();
    });
  }

  crear_form_modulo() {
    this.moduloForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(2),
          Validators.required,
        ]
      ],
      icono: ['',
        [

        ]
      ],
      concepto: ['',
        [
          Validators.minLength(10),
          Validators.required,
        ]
      ],
    })
  }

  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    try {
      let path = URL.createObjectURL(event.target.files[0]);
      id_img.setAttribute("src", path);
      this.img1 = event.target.files[0];
    } catch (error) {
      this.img1 = null;
      id_img.removeAttribute("src");
    }
  }

  cargaInfoModulo() {
    this.temaService.obtener_temas_por_id(this.moduleId).subscribe(resp => {
      this.infoModulo = resp;
      this.moduloForm.markAllAsTouched();
      this.moduloForm.updateValueAndValidity();
    })
  }

  registrarModulo() {
    this.moduloForm.markAllAsTouched();
    if (this.moduloForm.valid && (this.img1 != null || this.moduloForm.value.icono != '')) {
      const formData = new FormData();
      formData.append('titulo', this.moduloForm.value.titulo);
      formData.append('concepto', this.moduloForm.value.concepto);
      if (this.img1) {
        formData.append('images', this.img1);
      } else {
        formData.append('icono', this.moduloForm.value.icono);
      }
      this.modulosService.editar_modulo(this.moduleId, formData).subscribe({
        next: (data) => {
          if (data.estado == "1") {
            Swal.fire(
              '¡Éxito!',
              'Módulo modificado correctamentes',
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
          } else {
            Swal.fire(
              '¡Error!',
              'No se pudo modificar el módulo',
              'error'
            )
          }
        },
        error: (error) => {
          Swal.fire(
            '¡Error!',
            'No se pudo modificar el módulo',
            'error'
          )
        }
      })
    } else {
      Swal.fire(
        '¡Error!',
        'No cumple con los campos requeridos',
        'error'
      )
    }
  }

  iconModulo = iconos.faFolder;

}
