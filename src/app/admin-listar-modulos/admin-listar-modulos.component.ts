import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulosService } from '../servicios/modulos.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-listar-modulos',
  templateUrl: './admin-listar-modulos.component.html',
  styleUrls: ['./admin-listar-modulos.component.css', '../administrador/list/list.component.css']
})
export class AdminListarModulosComponent implements OnInit {

  /*Variables*/
  modulos: any[] = [];
  lenguajes: any[] = [];
  itemsForPage: number = 10;
  initialPage: number = 0;
  finalPage: number = 10;
  selectedLenguajeId: number = 0;
  status: boolean = true;
  spinnerStatus: boolean = false;

  constructor(
    private modulosService: ModulosService,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.spinnerStatus = true;
    this.obtener_listado_lenguajes(true);
  }

  obtener_listado_lenguajes(estado: boolean){
    this.spinnerStatus = false;
    this.lenguajeService.listar_lenguajes(estado).subscribe(resp =>{
      this.lenguajes = resp;
      this.selectedLenguajeId = this.lenguajes.length > 0 ? this.lenguajes[0].lenguaje_id : null;
      this.spinnerStatus = true;
      this.listar_modulos(true);
    })
  }
  onFilterChange(event: any) {
    this.status = event.target.value;
    this.listar_modulos(this.status);
  }

  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.modulos.length) {
      this.finalPage = this.modulos.length;
    }
  }

  changeLenguaje(event:any){
    this.selectedLenguajeId = event;
    this.listar_modulos(this.status);
  }

  //Método que lista los módulos
  listar_modulos(estado: boolean){
    this.spinnerStatus = false;
    this.modulosService.obtener_modulos(this.selectedLenguajeId, estado).subscribe(
      (resp) =>{
        this.spinnerStatus = true;
        this.modulos = resp;
      }, (error) => {
        this.spinnerStatus = true;
        this.modulos = [];
      });
  }

   //Método que cambia de estado un modulo
   cambiar_estado_modulo(nombreModulo: string, moduloID: number, estado: boolean){
    Swal.fire({
      title: ''+(estado?"Activar":"Desactivar")+' modulo',
      text: "¿Está seguro de "+(estado?"activar":"desactivar")+" el modulo \""+nombreModulo+"\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modulosService.cambiar_estado_modulo(moduloID, estado).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Proceso exitoso!',
              'El modulo fue '+(estado?"activado":"desactivado")+' con éxito',
              'success'
            );
            this.listar_modulos(this.status);
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo '+(estado?"activar":"desactivar")+' el módulo',
              'error'
            )
          }
        })
      }
    })
  }
  

  //Iconos a utilizar
  iconModulos = iconos.faFolder;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
  iconAdd = iconos.faPlusCircle;
  iconOn = iconos.faToggleOn;
  iconOff = iconos.faToggleOff;
}
