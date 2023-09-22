import { AfterViewInit, Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { LenguajesService } from '../servicios/lenguajes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-lenguaje',
  templateUrl: './admin-edit-lenguaje.component.html',
  styleUrls: ['../admin-crear-lenguajes/admin-crear-lenguajes.component.css']
})
export class AdminEditLenguajeComponent implements AfterViewInit, AfterContentInit {
  //Variables
  editLanguageForm!: FormGroup;
  lenguajeID: number = 0
  img1;
  infoLenguaje: any;
  spinnerStatus: boolean = false;

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lenguajeService: LenguajesService
  ) {
    this.crear_form_EditLenguaje();
  }

  //NgAfterContentInit
  ngAfterContentInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lenguajeID = Number.parseInt(params.get('id'));
      this.cargaInfoLenguaje();
    });
  }

  //ngAfterViewInit
  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lenguajeID = Number.parseInt(params.get('id'));
      this.cargaInfoLenguaje();
    });
  }

  //Método que crea el formulario para editar un lenguaje
  crear_form_EditLenguaje() {
    this.editLanguageForm = this.formBuilder.group({
      titulo: ['',
        [
          Validators.minLength(1),
          Validators.required
        ]
      ],
      portada: ['',
        [

        ]
      ],
      descripcion: ['',
        [
          Validators.minLength(10),
          Validators.required,
        ]
      ],
    });
  }

  //Método que compara que no hayan inputs con espacios (vacios)
  compararTextoVacio(campo: string) {
    if (this.editLanguageForm.get(campo)?.value.trim() === "")
      return true;
    else
      return false;
  }

  //Setea los inputs del formulario, para editar ellenguaje
  cargaInfoLenguaje() {
    this.spinnerStatus = false;
    this.lenguajeService.obtener_lenguaje_por_id(this.lenguajeID).subscribe(resp => {
      this.infoLenguaje = resp;
      this.editLanguageForm.updateValueAndValidity();
      this.spinnerStatus = true;
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

  //Método que manda a guardar los datos editados del formulario
  editar_lenguaje() {
    this.spinnerStatus = false;
    const formData = new FormData();
    formData.append('titulo', this.editLanguageForm.value.titulo);
    formData.append('descripcion', this.editLanguageForm.value.descripcion);
    if (this.img1) {
      formData.append('images', this.img1);
    } else {
      formData.append('portada', this.infoLenguaje.portada);
    }
    this.lenguajeService.editar_lenguaje(this.lenguajeID, formData).subscribe(resp => {
      if (resp.estado == 1) {
        this.spinnerStatus = true;
        Swal.fire(
          '¡Proceso exitoso!',
          'El lenguaje fue modificado con éxito.',
          'success'
        )
        this.router.navigate(['/administrador/lenguaje/list']);
      }
      else if (resp.estado == 2) {
        this.spinnerStatus = true;
        Swal.fire(
          '¡Error!',
          'El lenguaje ya ha sido registrado.',
          'error'
        )
      } else {
        this.spinnerStatus = true;
        Swal.fire(
          '¡Error!',
          'No se ha podido modificar el lenguaje.',
          'error'
        )
      }
    })

  }

  //Iconos
  iconLanguage = iconos.faGlobe;

}
