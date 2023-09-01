import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list-lenguajes',
  templateUrl: './admin-list-lenguajes.component.html',
  styleUrls: ['./admin-list-lenguajes.component.css', '../administrador/list/list.component.css']
})
export class AdminListLenguajesComponent implements OnInit {

  /*Variables*/
  lenguajes: any[] = [];
  constructor(
    public lenguajeService: LenguajesService,
  ) { }

  ngOnInit(): void {
    this.obtener_listado_lenguajes();
  }

  //Método que obtiene el listado de los lenguajes
  obtener_listado_lenguajes(){
    this.lenguajeService.listar_lenguajes().subscribe(resp =>{
      this.lenguajes = resp;
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
            this.obtener_listado_lenguajes();
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo modificar el estado del lenguaje',
              'error'
            )
            this.lenguajes = [];
            this.obtener_listado_lenguajes();
          }
        })
      }
    })
  }

  iconLanguages = iconos.faGlobe;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
}
