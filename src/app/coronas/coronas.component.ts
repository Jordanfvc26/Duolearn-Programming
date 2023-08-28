import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { EstadisticasService } from '../servicios/estadisticas.service';
import { TemasService } from '../servicios/temas.service';
import { LenguajesService } from '../servicios/lenguajes.service';


@Component({
  selector: 'app-coronas',
  templateUrl: './coronas.component.html',
  styleUrls: ['./coronas.component.css']
})
export class CoronasComponent implements OnInit {

  facrown = iconos.faCrown;
  json_general;

  //coronas

  coronas_tiene=0;
  coronas_totales=0;
  coronas_faltan=0;
  modulos=[];
  lenguajeSeleccionado='';
  constructor(
    public estadisticas_serv: EstadisticasService,
    public lenguajeService: LenguajesService,
    public temas_serv: TemasService
  ) { }

  ngOnInit(): void {
    this.lenguajeService.obtener_lenguaje_por_id(sessionStorage.getItem("lenguaje")).subscribe(resp => {
      this.lenguajeSeleccionado = resp.titulo;
    })
    this.temas_serv.obtener_temas_por_lenguaje(sessionStorage.getItem("lenguaje")).subscribe(resp => {
      this.coronas_totales = resp.length??0;
      this.modulos = resp;
      this.coronas();
      this.coronas_faltan=this.coronas_totales-this.coronas_tiene;
    });
  }

  coronas() {
    let contador = 0;
    this.modulos.forEach(element => {
      this.estadisticas_serv.obtener_puntajes(sessionStorage.getItem("user"),element.modulo_id).subscribe(resp=>{
        if(resp==null){
          contador+=0;
        }else{
          contador+=1;
        }
      })
    });
    this.coronas_tiene=contador;
  }

}
