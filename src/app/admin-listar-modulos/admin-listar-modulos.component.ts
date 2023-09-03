import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ModulosService } from '../servicios/modulos.service';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-listar-modulos',
  templateUrl: './admin-listar-modulos.component.html',
  styleUrls: ['./admin-listar-modulos.component.css', '../administrador/list/list.component.css']
})
export class AdminListarModulosComponent implements OnInit {

  /*Variables*/
  modulos: any[] = [];
  lenguajes: any[] = [];

  constructor(
    private modulosService: ModulosService,
    private lenguajeService: LenguajesService
  ) { }

  ngOnInit(): void {
    this.lenguajeService.listar_lenguajes(true).subscribe(resp =>{
      this.lenguajes = resp;
      console.log(this.lenguajes)
    })
  }

  //Método que lista los módulos
  listar_modulos(lenguajeID: number){
    this.modulosService.obtener_modulos(lenguajeID).subscribe(resp =>{
      this.modulos = resp;
    });
  }

   //Método que cambia de estado un modulo
   cambiar_estado_modulo(nombreModulo: string, moduloID: number){
    Swal.fire({
      title: 'Eliminar modulo',
      text: "¿Está seguro de eliminar el modulo \""+nombreModulo+"\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modulosService.cambiar_estado_modulo(moduloID, false).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Proceso exitoso!',
              'El modulo fue eliminado con éxito',
              'success'
            )
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo eliminar el módulo',
              'error'
            )
          }
        })
      }
    })
  }
  

  //Iconos a utilizar
  iconModulos = iconos.faFolder;
  iconEliminar = iconos.faTrashAlt;
}
