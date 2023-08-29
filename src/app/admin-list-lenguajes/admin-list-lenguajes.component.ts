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
    private lenguajeService: LenguajesService,
  ) { }

  ngOnInit(): void {
    this.lenguajeService.listar_lenguajes().subscribe(resp =>{
      this.lenguajes = resp;
    })
  }

  //Método que cambia de estado un lenguaje
  eliminar_lenguaje(nombreLenguaje: string, lenguajeID: number){
    Swal.fire({
      title: 'Eliminar lenguaje',
      text: "¿Está seguro de eliminar el lenguaje \""+nombreLenguaje+"\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lenguajeService.cambiar_estado_lenguaje(lenguajeID, false).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Proceso exitoso!',
              'El lenguaje fue eliminado con éxito',
              'success'
            )
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo eliminar el lenguaje',
              'error'
            )
          }
        })
      }
    })
  }

  iconLanguages = iconos.faGlobe;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;

}
