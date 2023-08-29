import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from '../servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css', '../administrador/list/list.component.css']
})
export class UsuariosComponent implements OnInit {
  /*Variables*/
  usuarios: any[] = [];

  constructor(
    private usuarios_serv: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.usuarios_serv.listar_usuarios().subscribe(resp => {
      this.usuarios = resp;
      console.log(this.usuarios);
    });
  }

  //Método que aprueba el usuario, como profesor
  aprobarComoProfesor(nombreUsuario: string, usuarioID: number){
    Swal.fire({
      title: 'Aceptar como profesor',
      text: "¿Está seguro de aceptar al usuario \""+nombreUsuario+"\" como PROFESOR en DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios_serv.aprobar_profesor(usuarioID).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Aprobación!',
              'El usuario fue aprobado con éxito',
              'success'
            )
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo aprobar el usuario',
              'error'
            )
          }
        })
      }
    })
  }

  //Método que elimina un usuario
  eliminarUsuario(nombreUsuario: string, usuarioID: number){
    Swal.fire({
      title: 'Eliminar usuario',
      text: "¿Está seguro de eliminar al usuario \""+nombreUsuario+"\" de DuoLearn Programming?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios_serv.eliminar_usuario(usuarioID).subscribe(resp => {
          if(resp.estado == "1"){
            Swal.fire(
              '¡Proceso exitoso!',
              'El usuario fue eliminado con éxito',
              'success'
            )
          }
          else{
            Swal.fire(
              '¡Error!',
              'No se pudo eliminar el usuario',
              'error'
            )
          }
        })
      }
    })
  }

  iconUsuarios = iconos.faUsers;
  iconAprobar = iconos.faKey;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrashAlt;
}
