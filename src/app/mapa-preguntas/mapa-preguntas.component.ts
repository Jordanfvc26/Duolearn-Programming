import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PreguntasCuatroComponent } from '../preguntas-cuatro/preguntas-cuatro.component';
import { PreguntasComponent } from '../preguntas/preguntas.component';
import { EstadisticasService } from '../servicios/estadisticas.service';
import * as $ from 'jquery';
import { TemasService } from '../servicios/temas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mapa-preguntas',
  templateUrl: './mapa-preguntas.component.html',
  styleUrls: ['./mapa-preguntas.component.css']
})

export class MapaPreguntasComponent implements AfterViewInit {

  faVisto = iconos.faCheckCircle;
  faQuestion = iconos.faQuestionCircle;
  public static mapa_modulo: any;
  @ViewChild("preg1") public preg1: ElementRef;
  @ViewChild("preg2") public preg2: ElementRef;
  @ViewChild("preg3") public preg3: ElementRef;
  @ViewChild("preg4") public preg4: ElementRef;
  @ViewChild("preg5") public preg5: ElementRef;
  @ViewChild("preg6") public preg6: ElementRef;
  @ViewChild("preg7") public preg7: ElementRef;
  @ViewChild("preg8") public preg8: ElementRef;
  @ViewChild("preg9") public preg9: ElementRef;
  @ViewChild("preg10") public preg10: ElementRef;

  //estilos letras
  estado1: any = { 'color': 'transparent' };
  estado2: any = { 'color': 'transparent' };
  estado3: any = { 'color': 'transparent' };
  estado4: any = { 'color': 'transparent' };
  estado5: any = { 'color': 'transparent' };
  estado6: any = { 'color': 'transparent' };
  estado7: any = { 'color': 'transparent' };
  estado8: any = { 'color': 'transparent' };
  estado9: any = { 'color': 'transparent' };
  estado10: any = { 'color': 'transparent' };

  //estilos botones
  estilo1: any;
  estilo2: any;
  estilo3: any;
  estilo4: any;
  estilo5: any;
  estilo6: any;
  estilo7: any;
  estilo8: any;
  estilo9: any;
  estilo10: any;

  valor: any;
  bol = true;
  actividades_rutas: any[] = ["/preguntas", "/preguntas-dos", "/preguntas-tres", "/preguntas-cinco"];
  estadisticas = [];

  constructor(
    public ruta: Router,
    public estadisticas_serv: EstadisticasService,
    public temas_serv: TemasService
  ) {
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {

    if (sessionStorage.getItem("modulo") == null) {
      this.ruta.navigateByUrl("/dashboard");
    } else {
      MapaPreguntasComponent.mapa_modulo = DashboardComponent.modulo_select;
      this.temas_serv.obtener_temas_por_id(sessionStorage.getItem("modulo")).subscribe(resp => {
        this.valor = resp.titulo_modulo;
      })
      this.estadisticas_serv.obtener_puntajes(sessionStorage.getItem("user"), sessionStorage.getItem("modulo")).subscribe(resp => {
        if(resp!=null){
          this.estadisticas = resp;
          if(resp.length==10){
            this.ruta.navigateByUrl("/dashboard");
          }else{
            this.verifica_usadas();
          }
        }
      });
    }

  }

  random: any;

  actividades(actividad: any) {
    this.random = this.getRandomInt(0, this.actividades_rutas.length - 1);
    if (this.random == 0) {
      PreguntasComponent.num_act = actividad;
      return "act1";
    } else {
      PreguntasCuatroComponent.numact = actividad;
      return "act2";
    }
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  json_general: any = {};

  hacer_act(actividad: any) {
    sessionStorage.setItem("num_act", actividad);
    this.actividades(actividad);
    this.ruta.navigateByUrl(this.actividades_rutas[this.random]);
  }

  verifica_usadas() {
    this.estadisticas.forEach(element => {
      switch(element.numero_actividad){
        case 1:
          this.estilo1 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado1 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 2:
          this.estilo2 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado2 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 3:
          this.estilo3 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado3 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 4:
          this.estilo4 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado4 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 5:
          this.estilo5 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado5 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 6:
          this.estilo6 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado6 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 7:
          this.estilo7 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado7 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 8:
          this.estilo8 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado8 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 9:
          this.estilo9 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado9 = { 'color': 'rgb(5, 196, 88)' };
        break;
        case 10:
          this.estilo10 = { 'background-color': 'rgb(5, 196, 88)', 'color': '#fff', "pointer-events": "none" };
          this.estado10 = { 'color': 'rgb(5, 196, 88)' };
        break;
      }
    });
  }

}
