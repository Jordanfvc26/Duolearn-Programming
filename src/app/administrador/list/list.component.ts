import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LenguajesService } from 'src/app/servicios/lenguajes.service';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { TemasService } from 'src/app/servicios/temas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    public ruta: Router,
    public act_serv: PreguntasService,
    public lenguajeService: LenguajesService,
    public tema_serv: TemasService
    ) { }

  faCerrarSesion = iconos.faSignOutAlt;
  iconDelete=iconos.faTrashAlt;
  iconEdit=iconos.faEdit;
  iconAdd=iconos.faPlusCircle;
  iconMyPatients=iconos.faQuestionCircle;
  iconBack=iconos.faArrowLeft;
  itemsForPage: number = 10;
  initialPage: number = 0;
  finalPage: number = 10;
  spinnerStatus: boolean = false;
  arrayLenguajes: any[]=[];
  actividades: any[]=[];
  selectedLenguajeId: number;
  arrayModulos: any[]=[];
  selectedModuloId: number;
  statusActividad= true;

  ngOnInit(): void {
    this.spinnerStatus = true;
    this.cargaLenguajes();
    //this.cargaPreguntas(true);
  }

  cargaLenguajes(){
    this.spinnerStatus = false;
    this.lenguajeService.listar_lenguajes(true).subscribe(resp => {
      this.spinnerStatus = true;
      this.arrayLenguajes = resp;
      this.selectedLenguajeId = this.arrayLenguajes.length > 0 ? this.arrayLenguajes[0].lenguaje_id : null;
      console.log(this.selectedLenguajeId)
      this.cargaModulos(this.selectedLenguajeId);
    })
  }

  changeLenguaje(event:any){
    console.log(event);
    this.selectedLenguajeId = event;
    this.cargaModulos(this.selectedLenguajeId);
  }

  changeModulo(event:any){
    console.log(event);
    this.selectedModuloId = event;
    this.cargaPreguntas(this.statusActividad);
  }

  cargaModulos(idLenguaje:any){
    this.spinnerStatus = false;
    this.tema_serv.obtener_temas_por_lenguaje(idLenguaje, true).subscribe(resp => {
      this.spinnerStatus = true;
      this.arrayModulos = resp;
      this.selectedModuloId = this.arrayModulos.length > 0 ? this.arrayModulos[0].modulo_id : null;
      this.cargaPreguntas(this.statusActividad);
      console.log(this.arrayModulos);
    })
  }
  cargaPreguntas(estado:boolean){
    this.spinnerStatus = false;
    this.act_serv.obtener_actividades_por_modulo(this.selectedModuloId,estado).subscribe(
      resp => {
      this.actividades = resp;
      this.spinnerStatus = true;
      console.log(this.actividades);
    },error => {
      this.spinnerStatus = true;
      this.actividades = [];
    }
    );
  }

  editarPregunta(id:any){
    this.ruta.navigate(['administrador/questions/edit/'+id]);
  }

  onFilterChange(event: any) {
    this.statusActividad = event.target.value;
    this.cargaPreguntas(this.statusActividad);
  }
  
  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/principal");
  }

  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.actividades.length) {
      this.finalPage = this.actividades.length;
    }
  }

  
  cambiar_estado_actividad(actividadId: number, estado: boolean){
    Swal.fire({
      title: ''+(estado?"Activar":"Desactivar")+' actividad',
      text: "¿Está seguro de "+(estado?"activar":"desactivar")+" la actividad de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.act_serv.cambia_estado_actividad(actividadId, estado).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Proceso exitoso!',
              'La actividad fue '+(estado?"activada":"desactivada")+' con éxito',
              'success'
            );
            this.cargaPreguntas(!estado);
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo '+(estado?"activar":"desactivar")+' la actividad',
              'error'
            )
          }
        })
      }
    })
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

  iconPreguntas = iconos.faQuestionCircle;
  iconListar = iconos.faList;
  iconCrear = iconos.faPlusCircle;
  iconOn = iconos.faToggleOn;
  iconOff = iconos.faToggleOff;
}
