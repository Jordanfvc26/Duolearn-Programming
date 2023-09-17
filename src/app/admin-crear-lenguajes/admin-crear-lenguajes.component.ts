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
  img1;
  spinnerStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ruta: Router,
    private lenguajeService: LenguajesService
  ) { }


  ngOnInit(): void {
    this.spinnerStatus = true;
    this.crear_form_lenguaje();
  }


  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
    console.log(event.target.files);
    this.img1 = event.target.files[0];
  }

  //Método que crea el formulario
  crear_form_lenguaje() {
    this.languageForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(1),
          Validators.required
        ]
      ],
      portada: [null,
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

  //Método que registra el lenguaje
  registrarLenguaje() {
    this.spinnerStatus = false;
    const formData = new FormData();
    this.languageForm.markAllAsTouched();
    if (this.languageForm.valid) {
      formData.append('titulo', this.languageForm.value.titulo);
      formData.append('descripcion', this.languageForm.value.descripcion);
      formData.append('images', this.img1);
      this.lenguajeService.nuevo_lenguaje(formData)
        .subscribe({
          next: (data) => {
            console.log(data);
            if (data.estado == 1) {
              this.spinnerStatus = true;
              Swal.fire(
                '¡Proceso exitoso!',
                'El lenguaje ' + this.languageForm.value.titulo + ' fue agregado con éxito',
                'success'
              )
              this.ruta.navigate(['/administrador/lenguaje/list']);
            } else if (data.estado == 2) {
              this.spinnerStatus = true;
              Swal.fire(
                '¡Error!',
                'El lenguaje ' + this.languageForm.value.titulo + ' ya ha sido registrado',
                'error'
              )
              this.ruta.navigate(['/administrador/lenguaje/list']);
            } else {
              this.spinnerStatus = true;
              Swal.fire(
                '¡Error!',
                'No se ha podido agregar el lenguaje ' + this.languageForm.value.titulo,
                'error'
              )
            }
          },
          error: (error) => {
            this.spinnerStatus = true;
            Swal.fire(
              '¡Error!',
              'No se ha podido agregar el lenguaje',
              'error'
            )
          }
        });
    }
  }

  //Método que compara que no hayan inputs con espacios (vacios)
  compararTextoVacio(campo: string) {
    if (this.languageForm.get(campo)?.value.trim() === "")
      return true;
    else
      return false;
  }

  //Iconos
  iconLanguage = iconos.faGlobe;
}
