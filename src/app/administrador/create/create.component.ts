import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LenguajesService } from 'src/app/servicios/lenguajes.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { TemasService } from 'src/app/servicios/temas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements AfterViewInit {

  constructor(
    public tema_serv: TemasService,
    public act_serv: PreguntasService,
    public lenguajeService: LenguajesService,
    public ruta: Router) { }
  faCerrarSesion = iconos.faSignOutAlt;
  //cuestionario
  @ViewChild("escoge1") public select1: ElementRef;
  @ViewChild("pregunta_cuestionario") public pregunta_cuest: ElementRef;
  @ViewChild("opcion_a_cuestionario") public opcion_a_cuestionario: ElementRef;
  @ViewChild("opcion_b_cuestionario") public opcion_b_cuestionario: ElementRef;
  @ViewChild("opcion_c_cuestionario") public opcion_c_cuestionario: ElementRef;
  @ViewChild("opcion_d_cuestionario") public opcion_d_cuestionario: ElementRef;

  //encontrar-error
  @ViewChild("imagen3") public imagen3: ElementRef;
  @ViewChild("opcion_a_error") public opcion_a_error: ElementRef;
  @ViewChild("opcion_b_error") public opcion_b_error: ElementRef;
  @ViewChild("opcion_c_error") public opcion_c_error: ElementRef;
  @ViewChild("opcion_d_error") public opcion_d_error: ElementRef;

  seleccionado = 0;
  tema_select = 0;
  lenguaje_select=0;
  Temas=[];
  faPlus = iconos.faPlusCircle;
  img1;
  img2;
  img3;
  lenguajes = [];
  spinnerStatus:boolean = false;

  ngOnInit(){
    this.spinnerStatus = true;
  }


  ngAfterViewInit(): void {
    this.lenguajeService.listar_lenguajes(true).subscribe(resp => {
      this.lenguajes = resp;
      console.log(this.lenguajes);
    })

  }

  cargarModulos() {
    this.Temas=[];
    this.tema_serv.obtener_temas_por_lenguaje(this.lenguaje_select, true).subscribe(resp => {
      this.Temas = resp;
      console.log(this.Temas);
    });
  }

  vista_preliminar1 = (event) => {
    let id_img = document.getElementById('img-vista-previa1');
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
    console.log(event.target.files);
    this.img1 = event.target.files[0];
  }

  vista_preliminar2 = (event) => {
    let id_img = document.getElementById('img-vista-previa2');
    let path = URL.createObjectURL(event.target.files[0]);
    this.img2 = event.target.files[0];
    console.log(event.target.files);
    id_img.setAttribute("src", path);
  }

  vista_preliminar3 = (event) => {
    let id_img = document.getElementById('img-vista-previa3');
    this.img3 = event.target.files[0];
    let path = URL.createObjectURL(event.target.files[0]);
    id_img.setAttribute("src", path);
  }

  formData = new FormData();

  valida_campos(preg: any): boolean {
    switch (preg) {
      case 1:
        if (this.pregunta_cuest.nativeElement.value != "" && this.opcion_a_cuestionario.nativeElement.value != ""
          && this.opcion_b_cuestionario.nativeElement.value != "" && this.opcion_c_cuestionario.nativeElement.value != ""
          && this.opcion_d_cuestionario.nativeElement.value != "") {
          return true;
        } else {
          return false;
        }
      case 2:
        if (this.img1 != null && this.img2 != null) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (this.pregunta_cuest.nativeElement.value != "" && this.opcion_a_cuestionario.nativeElement.value != ""
          && this.opcion_b_cuestionario.nativeElement.value != "" && this.opcion_c_cuestionario.nativeElement.value != ""
          && this.opcion_d_cuestionario.nativeElement.value != "") {
          return true;
        } else {
          return false;
        }
      case 4:
        if (this.img3 != null && this.opcion_a_error.nativeElement.value != ""
          && this.opcion_b_error.nativeElement.value != "" && this.opcion_c_error.nativeElement.value != ""
          && this.opcion_d_error.nativeElement.value != "") {
          return true;
        } else {
          return false;
        }
    }

  }

  valida_dragandrop(): number {
    let v = this.pregunta_cuest.nativeElement.value.split("\n");
    if (v.length == 4) {
      for (let index = 0; index < v.length; index++) {
        if (v[index] == "") {
          return 0;
        }
        if(!v[index].includes("//")){
          return 2;
        }
      }
      for (let i = 0; i < v.length; i++) {
        for (let j = i + 1; j < v.length; j++) {
          if (v[i].toLowerCase() == v[j].toLowerCase()) {
            return 3; // Se encontró una igualdad, los elementos no son todos diferentes.
          }
        }
      }
      return 1;
    } else {
      return 4;
    }
  }

  send_question() {
    if (this.seleccionado == 0 || this.tema_select == 0) {
      if (this.seleccionado == 0) {
        this.mensaje_mal("No ha ingresado ninguna pregunta", "Verifica que has seleccionado el tipo de pregunta");
      } else if (this.tema_select == 0) {
        this.mensaje_mal("Debe seleccionar el tema para su pregunta.", "Verifica que has seleccionado el modulo de tu pregunta");
      }
    } else {
      if (this.seleccionado == 2) {
        if (this.valida_campos(1)) {
          this.act_serv.realiza_pregunta({
            tema: this.tema_select,
            pregunta: this.pregunta_cuest.nativeElement.value.trim(),
            opcion_correcta: this.opcion_a_cuestionario.nativeElement.value.trim(),
            opcion2: this.opcion_b_cuestionario.nativeElement.value.trim(),
            opcion3: this.opcion_c_cuestionario.nativeElement.value.trim(),
            opcion4: this.opcion_d_cuestionario.nativeElement.value.trim(),
            tipo: "cuestionario"
          }).subscribe(resp => {
            if (resp.estado == 1) {
              this.mensaje_bien("Pregunta agregada con éxito");
              this.ruta.navigateByUrl("/administrador/questions/list");
            } else if (resp.estado == 2) {
              this.mensaje_mal("No se pudo agregar la pregunta",'Por favor, revisa que las opciones o pregunta no sean las mismas');
            }else{
              this.mensaje_mal("No se pudo agregar la pregunta",'Ocurrio un error inesperado');
            }
          });
        } else {
          this.mensaje_mal("Agregue todos los campos", "Por favor, verifica que has ingresado todos los campos requeridos");
        }
      } else if (this.seleccionado == 3) {
        if (this.valida_campos(2)) {
          this.formData.append("tema", this.tema_select.toString());
          this.formData.append("images", this.img1);
          this.formData.append("images", this.img2);
          this.formData.append("tipo", "pares");
          this.act_serv.realiza_pregunta(this.formData).subscribe(resp => {
            if (resp.estado == 1) {
              this.mensaje_bien("Pregunta agregada con éxito");
              this.ruta.navigateByUrl("/administrador/questions/list");
            }else{
              this.mensaje_mal("No se pudo agregar la pregunta",'Ocurrio un error inesperado');
            }
          });
        } else {
          this.mensaje_mal("Agregue las imagenes requeridas", "Por favor, verifica que has ingresado todos los campos requeridos");
        }
      } else if (this.seleccionado == 4) {
        if (this.valida_campos(3)) {
          const validado=this.valida_dragandrop();
          if (validado != 1) {
            switch (validado) {
              case 0:
                this.mensaje_mal("No debe estar vacío", "Por favor cumple con los requisitos de la pregunta");
                break;
              case 2:
                this.mensaje_mal("Las lineas deben llevar comentarios (//)", "Por favor cumple con los requisitos de la pregunta");
                break;
                case 3:
                  this.mensaje_mal("Las 4 lineas deben ser diferentes", "Por favor cumple con los requisitos de la pregunta");
                  break;
                case 4:
                  this.mensaje_mal("Deben ser 4 lineas de pregunta", "Por favor cumple con los requisitos de la pregunta");
                  break;

            }
          } else {
            this.act_serv.realiza_pregunta({
              tema: this.tema_select,
              pregunta: this.pregunta_cuest.nativeElement.value.trim(),
              opcion_correcta: this.opcion_a_cuestionario.nativeElement.value.trim(),
              opcion2: this.opcion_b_cuestionario.nativeElement.value.trim(),
              opcion3: this.opcion_c_cuestionario.nativeElement.value.trim(),
              opcion4: this.opcion_d_cuestionario.nativeElement.value.trim(),
              tipo: "drag-and-drop"
            }).subscribe(resp => {
              if (resp.estado == 1) {
                this.mensaje_bien("Pregunta agregada con éxito");
                this.ruta.navigateByUrl("/administrador/questions/list");
              } else if (resp.estado == 2) {
                this.mensaje_mal("No se pudo agregar la pregunta",'Por favor, revisa que las opciones o pregunta no sean las mismas');
              }else{
                this.mensaje_mal("No se pudo agregar la pregunta",'Ocurrio un error inesperado');
              }
            });
          }
          console.log(this.pregunta_cuest.nativeElement);
        } else {
          this.mensaje_mal("Error","Ingrese todos los campos necesarios");
        }
      } else if (this.seleccionado == 5) {
        if (this.valida_campos(4)) {
          this.formData.append("tema", this.tema_select.toString());
          this.formData.append("images", this.img3);
          this.formData.append("opcion_correcta", this.opcion_a_error.nativeElement.value.trim());
          this.formData.append("opcion2", this.opcion_b_error.nativeElement.value.trim());
          this.formData.append("opcion3", this.opcion_c_error.nativeElement.value.trim());
          this.formData.append("opcion4", this.opcion_d_error.nativeElement.value.trim());
          this.formData.append("tipo", "encontrar-error");
          this.act_serv.realiza_pregunta(this.formData).subscribe(resp => {
            if (resp.estado == 1) {
              this.mensaje_bien("Pregunta agregada con éxito");
              this.ruta.navigateByUrl("/administrador/questions/list");
            } else if (resp.estado == 2) {
              this.mensaje_mal("No se pudo agregar la pregunta",'Por favor, revisa que las opciones o pregunta no sean las mismas');
            }else{
              this.mensaje_mal("No se pudo agregar la pregunta",'Ocurrio un error inesperado');
            }
          });
        } else {
          this.mensaje_mal("Error","Ingrese todos los campos");
        }
      }
      this.formData = new FormData();
    }
  }

  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/principal");
  }

  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: true,
      timer: 2000
    })
  }

  placeholder() {

  }

  mensaje_mal(titulo:any, mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      showConfirmButton: true,
    });
  }
}
