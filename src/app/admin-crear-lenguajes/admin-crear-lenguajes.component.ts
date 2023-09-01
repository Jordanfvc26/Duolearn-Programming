import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-crear-lenguajes',
  templateUrl: './admin-crear-lenguajes.component.html',
  styleUrls: ['./admin-crear-lenguajes.component.css']
})
export class AdminCrearLenguajesComponent implements OnInit {
  /*Variables*/
  languageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private lenguajeService: LenguajesService
  ) { }

  
  ngOnInit(): void {
    this.crear_form_lenguaje()
  }

  //Método que crea el formulario
  crear_form_lenguaje() {
    this.languageForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(2),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      portada: [null,
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

  //Método que registra el lenguaje
  registrarLenguaje() {
    const formData = new FormData();
    formData.append('titulo', this.languageForm.value.titulo);
    formData.append('descripcion', this.languageForm.value.descripcion);

    const imagen: File = this.languageForm.get('portada').value;
    if (imagen) {
      formData.append("images", imagen);
      this.lenguajeService.nuevo_lenguaje(formData)
        .subscribe({
          next: (data) => {
            Swal.fire(
              '¡Proceso exitoso!',
              'El lenguaje fue agregado con éxito',
              'success'
            )
            this.ruta.navigateByUrl("administrador/questions/options")
          },
          error: (error) => {
            Swal.fire(
              '¡Error!',
              'No se ha podido cargar el video',
              'success'
            )
          }
        });
    } else {
      Swal.fire(
        '¡Error!',
        'Tipo de archivo no permitido',
        'error'
      )
    }
  }

  //Iconos
  iconLanguage = iconos.faGlobe;
}
