import { OnInit, Component } from '@angular/core';
import { PreguntasService } from '../servicios/preguntas.service';
import { ElementRef, ViewChild } from '@angular/core';

import * as iconos from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TemasService } from '../servicios/temas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  Pregunta: any;
  @ViewChild("opcion1") public opcion1: ElementRef;
  @ViewChild("pregunta") public pregunta: ElementRef;
  @ViewChild("opcion2") public opcion2: ElementRef;
  @ViewChild("opcion3") public opcion3: ElementRef;
  @ViewChild("opcion4") public opcion4: ElementRef;
  private datos: ElementRef[];
  private salio: any[] = [];
  private opciones: any[];
  public static num_act: any;
  faQuestion = iconos.faQuestionCircle;
  puntos = 20;
  valor: any;
  tiempo: number;

  constructor(
    private pregservice: PreguntasService, 
    public ruta: Router,
    public temas_serv: TemasService
    ) {
  }

  preg_aleatoria: any = {};

  ngOnInit(): void {
    if (sessionStorage.getItem("modulo") == null) {
      this.ruta.navigateByUrl("/dashboard");
    } else {
      this.temas_serv.obtener_temas_por_id(sessionStorage.getItem("modulo")).subscribe(resp => {
        this.valor = resp.titulo_modulo;
      })
      this.pregservice.obtener_preguntas_sin_resolver(sessionStorage.getItem("user"), sessionStorage.getItem("modulo"), "cuestionario").subscribe(resp => {
        this.Pregunta = resp;
        if(resp.estado!=0){
          this.startTimer();
          let rnd = this.getRandomInt(0, this.Pregunta.length - 1);
          this.preg_aleatoria = resp[rnd];
          this.cargar_elementos();
          //console.log(this.preg_aleatoria);
          this.opciones = [this.preg_aleatoria.opcion_correcta, this.preg_aleatoria.opcion2, this.preg_aleatoria.opcion3, this.preg_aleatoria.opcion4]
          this.pregunta.nativeElement.innerText = this.preg_aleatoria.pregunta;
          for (let i = 0; i < 4; i++) {
            let rnd = this.getRandomInt(0, 3);
            let bol = true;
            for (let j = 0; j <= this.salio.length; j++) {
              if (this.salio[j] == rnd) {
                bol = false;
              }
            }
            if (bol) {
              this.datos[i].nativeElement.innerText = this.opciones[rnd];
              this.salio.push(rnd);
            } else {
              i--;
            }
          }
        }else{
          Swal.fire(
            '¡Error!',
            'No hay preguntas suficientes de tipo cuestionario para este módulo',
            'error'
          )
          this.ruta.navigateByUrl("/mapa-preguntas");
        }
      })
      
    }

  }

  cargar_elementos() {
    this.datos = [this.opcion1, this.opcion2, this.opcion3, this.opcion4];
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  jsongeneral: any = {};
  ver_verde() {
    if (this.estilo1.border == "5px solid green" || this.estilo2.border == "5px solid green" || this.estilo3.border == "5px solid green" || this.estilo4.border == "5px solid green") {
      //console.log("avanza");
      this.enviar_respuesta();
      
      this.ruta.navigateByUrl('/mapa-preguntas', {
        skipLocationChange: true
      }).then(() =>
        this.ruta.navigate([PreguntasComponent])
      );

      //this.ruta.navigateByUrl("/mapa-preguntas");
    } else {
      //console.log("no avanza");
    }
  }

  estilo1: any = {};
  estilo2: any = {};
  estilo3: any = {};
  estilo4: any = {};


  comprueba(opcion: string) {
    let texto;
    switch (opcion) {
      case "opcion1":

        texto = this.opcion1.nativeElement.innerText;
        if (texto == this.preg_aleatoria.opcion_correcta) {
          //console.log("correcto");
          this.estilo1 = { 'border': '5px solid green', "pointer-events": "none" };
          this.estilo2 = this.concatJSON2(this.estilo2);
          this.estilo3 = this.concatJSON2(this.estilo3);
          this.estilo4 = this.concatJSON2(this.estilo4);
        } else {
          //console.log("incorrecto");
          this.estilo1 = { 'border': '5px solid red', "pointer-events": "none" };
          this.puntos -= 5;
        }
        break;
      case "opcion2":
        texto = this.opcion2.nativeElement.innerText;
        if (texto == this.preg_aleatoria.opcion_correcta) {
          //console.log("correcto");
          this.estilo2 = { 'border': '5px solid green', "pointer-events": "none" };
          this.estilo1 = this.concatJSON2(this.estilo1);
          this.estilo3 = this.concatJSON2(this.estilo3);
          this.estilo4 = this.concatJSON2(this.estilo4);
        } else {
          //console.log("incorrecto");
          this.estilo2 = { 'border': '5px solid red', "pointer-events": "none" };
          this.puntos -= 5;
        }
        break;
      case "opcion3":
        texto = this.opcion3.nativeElement.innerText;
        if (texto == this.preg_aleatoria.opcion_correcta) {
          //console.log("correcto");
          this.estilo3 = { 'border': '5px solid green', "pointer-events": "none" };
          this.estilo2 = this.concatJSON2(this.estilo2);
          this.estilo1 = this.concatJSON2(this.estilo1);
          this.estilo4 = this.concatJSON2(this.estilo4);
        } else {
          //console.log("incorrecto");
          this.estilo3 = { 'border': '5px solid red', "pointer-events": "none" };
          this.puntos -= 5;
        }
        break;
      case "opcion4":
        texto = this.opcion4.nativeElement.innerText;
        if (texto == this.preg_aleatoria.opcion_correcta) {
          //console.log("correcto");
          this.estilo4 = { 'border': '5px solid green', "pointer-events": "none" };
          this.estilo2 = this.concatJSON2(this.estilo2);
          this.estilo3 = this.concatJSON2(this.estilo3);
          this.estilo1 = this.concatJSON2(this.estilo1);
        } else {
          //console.log("incorrecto");
          this.estilo4 = { 'border': '5px solid red', "pointer-events": "none" };
          this.puntos -= 5;
        }
        break;
    }

  }

  abandonar() {
    this.ruta.navigateByUrl("/mapa-preguntas");
  }

  concatJSON2(estilo: any) {

    const estiloaux = { "pointer-events": "none" };
    const merge = Object.assign({}, estilo, estiloaux);
    return merge;
  }

  hoy = new Date();

  enviar_respuesta() {
    this.pauseTimer();
    if (this.min = "00") {
      this.tiempo = 1;
    } else {
      this.tiempo = Number.parseInt(this.min);
    }
    var fecha = this.hoy.getFullYear() + '-' + (this.hoy.getMonth() + 1) + '-' + this.hoy.getDate();
    this.pregservice.send_solves(
      sessionStorage.getItem("user"),
      {
        id_actividad: this.Pregunta[0].actividad_id, 
        minutos: this.tiempo, 
        intentos: 1, 
        num_actividad: Number.parseInt(sessionStorage.getItem("num_act")), 
        puntaje: this.puntos 
      }).subscribe(resp => {
      console.log(resp);
    });
  }

  //cronometro
  time: string = '00';
  min: string = '00';
  interval;
  play = false;

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      let seg = Number.parseInt(this.time);
      seg++;
      if (seg < 10) {
        this.time = '0' + seg;
      } else {
        this.time = seg.toString();
      }
      if (this.time == '60') {
        this.time = '00';
        let m = Number.parseInt(this.min);
        m++;
        if (m < 10) {
          this.min = '0' + m;
        } else {
          this.min = m.toString();
        }
      }
    }, 1000)
  }

  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
  }

}