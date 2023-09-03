import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EstadisticasService } from '../servicios/estadisticas.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import { TemasService } from '../servicios/temas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  fachart = iconos.faChartBar;
  constructor(
    public estadisticas_serv: EstadisticasService,
    public lenguajeService: LenguajesService,
    public temas_serv: TemasService
    ) { }

  bol = true;
  modulos=[];
  ngOnInit(): void {
    const observable2 = this.temas_serv.obtener_temas_por_lenguaje(sessionStorage.getItem("lenguaje"), true);
    forkJoin([observable2]).subscribe(
      ([result1]) => {
        this.modulos = result1;
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
  }

}
