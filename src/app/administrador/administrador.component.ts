import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { PreguntasService } from '../servicios/preguntas.service';
import { TemasService } from '../servicios/temas.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

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
  Temas: any;
  faPlus = iconos.faPlusCircle;
  faCerrarSesion = iconos.faSignOutAlt;
  iconArrowDown=iconos.faArrowDown;
  img1;
  img2;
  img3;
  activeLink: string = '';
  indice: number = 0;
  static userType: string = '';
  userTypeRecived : string = "";

  constructor(public tema_serv: TemasService, public act_serv: PreguntasService, public ruta: Router) { }

  /*ngOnInit*/
  ngOnInit(): void {
    this.userTypeRecived = sessionStorage.getItem('userType');
    const currentUrl = this.ruta.url;
    if (currentUrl.includes('users')) {
      this.indice = 4;
    } else if (currentUrl.includes('modulos')) {
      this.indice = 2;
    } else if (currentUrl.includes('questions')) {
      this.indice = 3;
    } else if (currentUrl.includes('lenguajes')) {
      this.indice = 1;
    }

  }

  toggleNavbar() {
    const body = document.getElementById('body-pd');
    const navbar = document.getElementById('nav-bar');

    if (body && navbar) {
      navbar.classList.toggle('show');
      body.classList.toggle('body-pd');
    }
  }

  toggleActiveLink(linkName: string) {
    if (this.activeLink === linkName) {
      this.activeLink = '';
    } else {
      this.activeLink = linkName;
    }
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

  valida_dragandrop(): boolean {
    let v = this.pregunta_cuest.nativeElement.value.split("\n");
    if (v.length == 4) {
      for (let index = 0; index < v.length; index++) {
        if (v[index] == "") {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  send_question() {
    if (this.seleccionado == 0 || this.tema_select == 0) {
      if (this.seleccionado == 0) {
        this.mensaje_mal("No ha ingresado ninguna pregunta");
      } else if (this.tema_select == 0) {
        this.mensaje_mal("Debe seleccionar el tema para su pregunta..");
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
            } else {
              this.mensaje_bien("Pregunta agregada con éxito");
              console.log("No se pudo agregar la pregunta");
            }
            this.seleccionado = 0;
            this.tema_select = 0;
          });
        } else {
          this.mensaje_mal("Agregue todos los campos");
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
            } else {
              this.mensaje_bien("Se pudo agregar la imagen");
              console.log("No se pudo agregar la pregunta");
            }
            this.seleccionado = 0;
            this.tema_select = 0;
          });
        } else {
          this.mensaje_mal("Agregue las imagenes requeridas");
        }
      } else if (this.seleccionado == 4) {
        if (this.valida_campos(3)) {
          if (this.valida_dragandrop() == false) {
            this.mensaje_mal("Deben ser 4 lineas de pregunta");
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
              } else {
                this.mensaje_bien("Pregunta agregada con éxito");
                console.log("No se pudo agregar la pregunta");
              }
              this.seleccionado = 0;
              this.tema_select = 0;
            });
          }
          console.log(this.pregunta_cuest.nativeElement);
        } else {
          this.mensaje_mal("Ingrese todos los campos necesarios");
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
            } else {
              this.mensaje_bien("Pregunta agregada con éxito");
              console.log("No se pudo agregar la pregunta")
            }
            this.seleccionado = 0;
            this.tema_select = 0;
          });
        } else {
          this.mensaje_mal("Ingrese todos los campos");
        }
      }
      this.formData = new FormData();
    }
  }

  mensaje_bien(mensaje: any) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000
    })
  }

  mensaje_mal(mensaje: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

  /*Método para cerrar la sesión*/
  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/login");
  }

  /*Método que cambia el índice para ver la opción del menú*/
  cambiarIndice(indice: number) {
    this.indice = indice;
    switch (indice) {
      case 0:
        this.ruta.navigate(['administrador']);
        break;
      case 1:
        this.ruta.navigate(['administrador/lenguaje/list']);
        break;
      case 2:
        this.ruta.navigate(['administrador/modulos/list']);
        break;
      case 3:
        this.ruta.navigate(['administrador/questions/list']);
        break;
      case 4:
        this.ruta.navigate(['administrador/users/list']);
        break;
      default:
        this.close_session();
        break;
    }
  }


  //Iconos a utilizar
  iconBars = iconos.faBars;
  iconHome = iconos.faHome;
  iconLanguage = iconos.faGlobe;
  iconModules = iconos.faFolder;
  iconQuestions = iconos.faQuestionCircle;
  iconUsers = iconos.faUsers;
  iconSignOut = iconos.faSignOutAlt;
  iconListar = iconos.faList;
  iconCrear = iconos.faPlusCircle;
  iconEditar = iconos.faEdit;

  fagraduation = iconos.faGraduationCap;
  fachart = iconos.faChartBar;
  fauser = iconos.faUser;
  facomments = iconos.faComments;
  facrown = iconos.faCrown;
  fasignoutalt = iconos.faSignOutAlt;
  fasearch = iconos.faSearch;
}