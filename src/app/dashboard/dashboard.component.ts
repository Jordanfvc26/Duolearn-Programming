import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { InstruccionesComponent } from '../instrucciones/instrucciones.component';
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

  //
  @ViewChild("lenguaje") public esc: ElementRef;


  //porcentajes
  public static porcentaje_mod1: any = 0;
  public static porcentaje_mod2: any = 0;
  public static porcentaje_mod3: any = 0;
  public static porcentaje_mod4: any = 0;
  public static porcentaje_mod5: any = 0;
  public static porcentaje_mod6: any = 0;
  public static porcentaje_mod7: any = 0;
  public static porcentaje_mod8: any = 0;
  //porcentajes
  porcentaje_1: any = DashboardComponent.porcentaje_mod1;
  porcentaje_2: any = DashboardComponent.porcentaje_mod2;
  porcentaje_3: any = DashboardComponent.porcentaje_mod3;
  porcentaje_4: any = DashboardComponent.porcentaje_mod4;
  porcentaje_5: any = DashboardComponent.porcentaje_mod5;
  porcentaje_6: any = DashboardComponent.porcentaje_mod6;
  porcentaje_7: any = DashboardComponent.porcentaje_mod7;
  porcentaje_8: any = DashboardComponent.porcentaje_mod8;

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

  //estilos iconos
  estiloicono1: any;
  estiloicono2: any;
  estiloicono3: any;
  estiloicono4: any;
  estiloicono5: any;
  estiloicono6: any;
  estiloicono7: any;
  estiloicono8: any;

  //nummod
  nun_mod: any = 0;
  infoLenguaje:any;
  lenguajes=[];
  modulos=[];
  infoUser:any;
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.bol = !this.bol;
      this.bol2 = !this.bol2;
    }, 1250);
    AOS.init();
    const observable1 = this.lenguajeService.obtener_lenguaje_por_id(sessionStorage.getItem("lenguaje"));
    const observable2 = this.lenguajeService.listar_lenguajes();
    const observable3 = this.user_serv.get_user({ usuario: sessionStorage.getItem("user") });
    const observable4 = this.temas_serv.obtener_temas_por_id(sessionStorage.getItem("lenguaje"));
    forkJoin([observable1, observable2, observable3, observable4]).subscribe(
      ([result1, result2, result3, result4]) => {
        this.infoLenguaje = result1;
        this.lenguajes = result2;
        this.infoUser = result3;
        this.modulos = result4;
        this.modulos.forEach(element => {
          this.estadisticas_serv.obtener_puntajes(sessionStorage.getItem("user"),element.modulo_id).subscribe(resp=>{
            if(resp==null){
              element.porcentaje='0';
            }else{
              element.porcentaje=resp.length.toString()+"0";
            }
          })
        })
      },
      error => {
        console.error('Error:', error);
      }
    );

    this.user_serv.get_user({ usuario: sessionStorage.getItem("user") }).subscribe(resp => {
      if (resp.estado != 1) {
        this.ruta.navigateByUrl("/principal");
      }
      else {
        this.nombre = this.infoUser.usuario;
        this.asigna_img();
      }
    });
  }

  agregar_text(entrada: any, number: any) {
    sessionStorage.setItem("modulo", entrada);
    this.nun_mod = number;
    sessionStorage.setItem("num_mod", number);
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
    this.img=this.infoLenguaje.portada;
  }
}
