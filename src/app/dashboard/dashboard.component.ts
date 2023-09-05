import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import { UsuariosService } from '../servicios/usuarios.service';
import { EstadisticasService } from '../servicios/estadisticas.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import { forkJoin } from 'rxjs';
import { TemasService } from '../servicios/temas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  bol: boolean = true;
  bol2: boolean = false;

  constructor(
    public ruta: Router,
    private user_serv: UsuariosService,
    public temas_serv: TemasService,
    public lenguajeService: LenguajesService,
    public estadisticas_serv: EstadisticasService
  ) { }


  fagraduation = iconos.faGraduationCap;
  fahome = iconos.faHome;
  fachart = iconos.faChartBar;
  fauser = iconos.faUser;
  facomments = iconos.faComments;
  facrown = iconos.faCrown;
  fasignoutalt = iconos.faSignOutAlt;
  fabars = iconos.faBars;
  fasearch = iconos.faSearch;
  //modulos
  fainfocircle = iconos.faInfoCircle;
  facheckcircle = iconos.faCheckCircle;
  faredoalt = iconos.faRedoAlt;
  facubes = iconos.faCubes;
  fahive = iconosfab.faHive;
  fath = iconos.faTh;
  fafont = iconos.faFont;
  fafilealt = iconos.faCode;
  facode = iconos.faCode;

  lenguajeSeleccionado: any;
  public static modulo_select: any = "vacio";
  public nombre: string;
  json_general: any = {};

  //estilos
  estilo1: any;
  estilo2: any;
  estilo3: any;
  estilo4: any;
  estilo5: any;
  estilo6: any;
  estilo7: any;
  estilo8: any;

  //estilos letras
  estiloletra1: any;
  estiloletra2: any;
  estiloletra3: any;
  estiloletra4: any;
  estiloletra5: any;
  estiloletra6: any;
  estiloletra7: any;
  estiloletra8: any;

  //nummod
  nun_mod: any = 0;
  infoLenguaje: any;
  lenguajes = [];
  modulos = [];
  infoUser: any;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.bol = !this.bol;
      this.bol2 = !this.bol2;
    }, 1250);
    AOS.init();
    const observable = this.user_serv.get_user(sessionStorage.getItem("user"));
    const observable1 = this.lenguajeService.obtener_lenguaje_por_id(sessionStorage.getItem("lenguaje"));
    const observable2 = this.lenguajeService.listar_lenguajes(true);
    forkJoin([observable, observable1, observable2]).subscribe(
      ([inicial, result1, result2]) => {
        if (inicial.estado != 1) {
          this.ruta.navigateByUrl("/principal");
        } else {
          this.infoLenguaje = result1;
          this.lenguajes = result2??[];
          this.infoUser = inicial;
          this.temas_serv.obtener_temas_por_lenguaje(sessionStorage.getItem("lenguaje"), true).subscribe(
            resp => {
              this.modulos = resp??[];
              if(this.modulos.length>0){
                this.modulos.forEach(element => {
                  this.estadisticas_serv.obtener_puntajes(sessionStorage.getItem("user"), element.modulo_id).subscribe(resp => {
                    if (resp == null) {
                      element.porcentaje = '0';
                    } else {
                      element.porcentaje = resp.length.toString() + "0";
                    }
                  })
                })
              }
          },
            error => {
              this.modulos = [];
              console.error('Murio :c :', error);
            }
          )
          this.nombre = this.infoUser.usuario;
          this.asigna_img();
        }
      },
      error => {
        console.error('Murio :c :', error);
      }
    );
  }

  agregar_text(entrada: any) {
    sessionStorage.setItem("modulo", entrada);
    this.ruta.navigateByUrl("/teorias");
  }

  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/principal");
  }

  img: any = "";

  elegir_leng() {
    sessionStorage.setItem("lenguaje", this.lenguajeSeleccionado);
    window.location.reload();
  }
  asigna_img() {
    this.lenguajeSeleccionado = this.infoLenguaje.lenguaje_id;
    this.img = this.infoLenguaje.portada;
  }
}
