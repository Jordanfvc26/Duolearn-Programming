import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-list-lenguajes',
  templateUrl: './admin-list-lenguajes.component.html',
  styleUrls: ['./admin-list-lenguajes.component.css', '../administrador/list/list.component.css']
})
export class AdminListLenguajesComponent implements OnInit {

  /*Variables*/
  lenguajes: any[] = [];
  itemsForPage: number = 10;
  initialPage: number = 0;
  finalPage: number = 10;
  iconLanguage = iconos.faGlobe;
  spinnerStatus: boolean = false;

  constructor(
    public lenguajeService: LenguajesService,
  ) { }

  ngOnInit(): void {
    this.spinnerStatus = true;
    this.obtener_listado_lenguajes(true);
  }

  //Método que obtiene el listado de los lenguajes
  obtener_listado_lenguajes(estado: boolean){
    this.spinnerStatus = false;
    this.lenguajeService.listar_lenguajes(estado).subscribe(resp =>{
      this.lenguajes = resp;
      this.spinnerStatus = true;
    })
  }

  //Método que cambia de estado un lenguaje
  eliminar_lenguaje(nombreLenguaje: string, lenguajeID: number, status: boolean, statusText: string){
    Swal.fire({
      title: statusText +' lenguaje',
      text: "¿Está seguro de "+statusText.toLowerCase()+" el lenguaje \""+nombreLenguaje+"\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lenguajeService.cambiar_estado_lenguaje(lenguajeID, status).subscribe(resp => {
          if(resp.estado == 1){
            Swal.fire(
              '¡Proceso exitoso!',
              'Estado del lenguaje modificado con éxito',
              'success'
            )
            this.lenguajes = [];
            this.obtener_listado_lenguajes(true);
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo modificar el estado del lenguaje',
              'error'
            )
            this.lenguajes = [];
            this.obtener_listado_lenguajes(true);
          }
        })
      }
    })
  }

  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true")
      this.obtener_listado_lenguajes(true);
    else if (value === "false")
      this.obtener_listado_lenguajes(false);
  }

  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.lenguajes.length) {
      this.finalPage = this.lenguajes.length;
    }
  }

  iconLanguages = iconos.faGlobe;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
  iconAdd = iconos.faPlusCircle;
  iconOn = iconos.faToggleOn;
  iconOff = iconos.faToggleOff;
}
