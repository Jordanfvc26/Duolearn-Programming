import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { LenguajesService } from '../servicios/lenguajes.service';

@Component({
  selector: 'app-admin-edit-lenguaje',
  templateUrl: './admin-edit-lenguaje.component.html',
  styleUrls: ['./admin-edit-lenguaje.component.css', '../admin-crear-lenguajes/admin-crear-lenguajes.component.css']
})
export class AdminEditLenguajeComponent implements OnInit {
  //Variables
  editLanguageForm!: FormGroup;
  optionLenguajeSelected: string = "";
  arrayLenguajes: any[] = [];
  lenguajeID: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.crear_form_EditLenguaje();
    this.lenguajeService.listar_lenguajes().subscribe(resp => {
      this.arrayLenguajes = resp;
    })
  }

  //Método que crea el formulario para editar un lenguaje
  crear_form_EditLenguaje() {
    this.editLanguageForm = this.formBuilder.group({
      selectLenguaje: ['Seleccione una opción'],
      titulo: ['',
        [
          Validators.minLength(2),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
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

  //Setea los inputs del formulario, para editar ellenguaje
  lenguaje_seleccionado(lenguaje_id: any) {
    this.lenguajeID = lenguaje_id;
    this.lenguajeService.obtener_lenguaje_por_id_admin(lenguaje_id).subscribe(resp => {
      this.editLanguageForm.get('titulo')?.setValue(resp.titulo);
      this.editLanguageForm.get('descripcion')?.setValue(resp.descripcion);
    })  
  }

  //Método que manda a guardar los datos editados del formulario
  editar_lenguaje() {
    let body = {
      titulo: this.editLanguageForm.value.titulo,
      descripcion: this.editLanguageForm.value.descripcion
    }
    this.lenguajeService.editar_lenguaje(this.lenguajeID, body).subscribe(resp => {
      if (resp.estado == 1) {
        Swal.fire(
          '¡Proceso exitoso!',
          'El lenguaje fue agregado con éxito',
          'success'
        )
      }
      else {
        Swal.fire(
          '¡Proceso exitoso!',
          resp.message,
          'success'
        )
      }
    })

  }

  //Iconos
  iconLanguage = iconos.faGlobe;

}
