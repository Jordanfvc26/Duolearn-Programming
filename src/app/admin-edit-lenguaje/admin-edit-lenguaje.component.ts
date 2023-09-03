import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class AdminEditLenguajeComponent implements AfterViewInit {
  //Variables
  editLanguageForm!: FormGroup;
  lenguajeID: number = 0
  img1;
  infoLenguaje: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lenguajeService: LenguajesService
  ) { 
    this.crear_form_EditLenguaje();
  }

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
          Validators.minLength(2),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      portada: [null
      ],
      descripcion: ['',
        [
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
    });
    this.editLanguageForm.valueChanges.subscribe(() => {
      this.editLanguageForm.updateValueAndValidity();
    })
  }

  //Setea los inputs del formulario, para editar ellenguaje
  cargaInfoLenguaje() {
    this.lenguajeService.obtener_lenguaje_por_id(this.lenguajeID).subscribe(resp => {
      this.infoLenguaje = resp;
    })
  }

  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
    console.log(event.target.files);
    this.img1 = event.target.files[0];
  }

  //Método que manda a guardar los datos editados del formulario
  editar_lenguaje() {
    const formData = new FormData();
    formData.append('titulo', this.editLanguageForm.value.titulo);
    formData.append('descripcion', this.editLanguageForm.value.descripcion);
    if (this.img1){
      formData.append('images', this.img1);
    }else{
      formData.append('portada', this.infoLenguaje.portada);
    }
    this.lenguajeService.editar_lenguaje(this.lenguajeID, formData).subscribe(resp => {
      if (resp.estado == 1) {
        Swal.fire(
          '¡Proceso exitoso!',
          'El lenguaje fue modificado con éxito',
          'success'
        )
        this.router.navigate(['/administrador/lenguaje/list']);
      }
      else if (resp.estado == 2) {
        Swal.fire(
          '¡Error!',
          'El lenguaje ya ha sido registrado',
          'error'
        )
      }else{
        Swal.fire(
          '¡Error!',
          'No se ha podido modificar el lenguaje',
          'error'
        )
      }
    })

  }

  //Iconos
  iconLanguage = iconos.faGlobe;

}
