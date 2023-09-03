import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../servicios/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css', '../administrador/list/list.component.css']
})
export class UsuariosComponent implements OnInit {
  /*Variables*/
  usuarios: any[] = [];
  itemsForPage: number = 10;
  initialPage: number = 0;
  finalPage: number = 10;

  constructor(
    private usuarios_serv: UsuariosService,
    public ruta:Router
  ) { }

  ngOnInit(): void {
    this.cargaUsuarios(true);
  }

  cargaUsuarios(estado:boolean) {
    this.usuarios_serv.listar_usuarios(estado).subscribe(resp => {
      this.usuarios = resp;
    });
  }

  onFilterChange(event: any) {
    this.cargaUsuarios(event);
  }

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
      title: 'Aceptar como profesor',
      text: "¿Está seguro de aceptar al usuario \"" + nombreUsuario + "\" como PROFESOR en DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios_serv.aprobar_profesor(usuarioID).subscribe(resp => {
          if (resp.estado == "1") {
            Swal.fire(
              '¡Aprobación!',
              'El usuario fue aprobado con éxito',
              'success'
            )
          }
          else {
            Swal.fire(
              '¡Error!',
              'No se pudo aprobar el usuario',
              'error'
            )
          }
          this.cargaUsuarios(true);
        })
      }
    })
  }

  //Método que elimina un usuario
  eliminarUsuario(nombreUsuario: string, usuarioID: number, estado:any) {
    Swal.fire({
      title: ''+(estado?"Activar":"Desactivar")+' usuario',
      text: "¿Está seguro de "+(estado?"activar":"desactivar")+" al usuario \"" + nombreUsuario + "\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios_serv.eliminar_usuario(usuarioID, estado).subscribe(resp => {
          if (resp.estado == "1") {
            Swal.fire(
              '¡Proceso exitoso!',
              'El usuario fue '+(estado?"activado":"desactivado")+' con éxito',
              'success'
            )
          }
          else {
            Swal.fire(
              '¡Error!',
              'No se pudo '+(estado?"activar":"desactivar")+' el usuario',
              'error'
            )
          }
          this.cargaUsuarios(!estado);
        })
      }
    })
  }

  iconUsuarios = iconos.faUsers;
  iconAprobar = iconos.faKey;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
  iconReactivar = iconos.faUndo;
  iconOn = iconos.faToggleOn;
  iconOff = iconos.faToggleOff;
}
