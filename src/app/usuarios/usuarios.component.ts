import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css', '../administrador/list/list.component.css']
})
export class UsuariosComponent implements OnInit {
  /*Variables*/
  usuarios: any[] = [];
  usersToSearch: any[] = [];
  optionFilter: string = "usuario";
  itemsForPage: number = 10;
  initialPage: number = 0;
  finalPage: number = 10;
  spinnerStatus: boolean = false;

  //Constructor
  constructor(
    private usuarios_serv: UsuariosService,
    public ruta: Router
  ) { }

  //NgOnInit()
  ngOnInit(): void {
    this.spinnerStatus = true;
    this.cargaUsuarios(true);
  }

  //Método que obtiene el listado de usuarios
  cargaUsuarios(estado: boolean) {
    this.spinnerStatus = false;
    this.usuarios_serv.listar_usuarios(estado)
      .subscribe({
        next: (resp) => {
          this.spinnerStatus = true;
          if(resp!=null){
            this.usuarios = resp.filter(usuario => usuario.tipo_usuario != 'administrador');
          }else{
            this.usuarios=[];
          }
        },
        error: (error) => {
          this.spinnerStatus = true;
          Swal.fire(
            '¡Ha ocurrido un error!',
            'No se pudo obtener el listado de usuarios, por favor recargue esta página.',
            'error'
          )
        }
      })
  }

  //Para filtrar los usuarios por activos e inactivos
  onFilterChange(event: any) {
    this.cargaUsuarios(event)
  }

  //Para cambiar de pagina de la lista
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.usuarios.length) {
      this.finalPage = this.usuarios.length;
    }
  }

  //Método que aprueba el usuario, como profesor
  aprobarComoProfesor(nombreUsuario: string, usuarioID: number) {
    Swal.fire({
      title: 'Aceptar como docente',
      text: "¿Está seguro de aceptar al usuario \"" + (nombreUsuario).toUpperCase() + "\" como DOCENTE en DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerStatus = false;
        this.usuarios_serv.aprobar_profesor(usuarioID).subscribe(resp => {
          if (resp.estado == "1") {
            this.spinnerStatus = true;
            Swal.fire(
              '¡Proceso exitoso!',
              'El usuario fue aprobado con éxito y ahora es tipo DOCENTE',
              'success'
            )
          }
          else {
            this.spinnerStatus = true;
            Swal.fire(
              '¡Ha ocurrido un error!',
              'No se ha podido aprobar el usuario como DOCENTE',
              'error'
            )
          }
          this.spinnerStatus = true;
          this.cargaUsuarios(true);
        })
      }
    })
  }

  //Método que elimina (Desactiva) un usuario
  eliminarUsuario(nombreUsuario: string, usuarioID: number, estado: any) {
    Swal.fire({
      title: '' + (estado ? "Activar" : "Desactivar") + ' usuario',
      text: "¿Está seguro de " + (estado ? "activar" : "desactivar") + " al usuario \"" + (nombreUsuario).toUpperCase() + "\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerStatus = false;
        this.usuarios_serv.eliminar_usuario(usuarioID, estado).subscribe(resp => {
          if (resp.estado == "1") {
            this.spinnerStatus = true;
            Swal.fire(
              '¡Proceso exitoso!',
              'El usuario fue ' + (estado ? "activado" : "desactivado") + ' con éxito',
              'success'
            )
          }
          else {
            this.spinnerStatus = true;
            Swal.fire(
              '¡Ha ocurrido un error!',
              'No se pudo ' + (estado ? "activar" : "desactivar") + ' el usuario',
              'error'
            )
          }
          this.spinnerStatus = true;
          this.cargaUsuarios(!estado);
        })
      }
    })
  }

  //Iconos a utilizar
  iconUsuarios = iconos.faUsers;
  iconAprobar = iconos.faKey;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
  iconReactivar = iconos.faUndo;
  iconOn = iconos.faToggleOn;
  iconOff = iconos.faToggleOff;
}
