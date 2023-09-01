import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public ruta: Router,public act_serv: PreguntasService) { }
  faCerrarSesion = iconos.faSignOutAlt;
  iconDelete=iconos.faTrashAlt;
  iconEdit=iconos.faEdit;
  iconAdd=iconos.faPlusCircle;
  iconMyPatients=iconos.faQuestionCircle;

  actividades: any[]=[];
  ngOnInit(): void {
    this.act_serv.get_questionsAll().subscribe(resp => {
      this.actividades = resp;
    });
  }

  
  close_session() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/principal");
  }

  removeActivity(id:any){
    this.act_serv.removeActivity(id).subscribe(resp=>{
      if(resp.estado==1){
        this.mensaje_bien("La actividad fue eliminada");
        this.ngOnInit();
      }else{
        this.mensaje_mal("No se pudo eliminar la actividad");
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
}
