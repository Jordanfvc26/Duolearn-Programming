import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { LenguajesService } from '../servicios/lenguajes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-elegir-lenguaje',
  templateUrl: './elegir-lenguaje.component.html',
  styleUrls: ['./elegir-lenguaje.component.css']
})
export class ElegirLenguajeComponent implements OnInit {

  lenguajes = [];
  spinnerStatus: boolean = false;

  //Constructor
  constructor(
    private ruta: Router,
    public lenguajeService: LenguajesService
  ) { }

  //ngOnInit()
  ngOnInit(): void {
    AOS.init();
    this.obtenerListadoLenguajes();
  }

  //Método que obtiene el listado de lenguajes
  obtenerListadoLenguajes() {
    this.spinnerStatus = false;
    this.lenguajeService.listar_lenguajes(true)
      .subscribe({
        next: (resp) => {
          this.lenguajes = resp;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          Swal.fire(
            '¡Ha ocurrido un error!',
            'No se pudo obtener el listado de lenguajes, por favor recargue esta página.',
            'error'
          )
        }
      })
  }

  //Método que redirecciona al dashboard con el lenguaje seleccionado
  redirigir(lenguaje: any) {
    sessionStorage.setItem("lenguaje", lenguaje);
    this.ruta.navigateByUrl("/dashboard");
  }

  //Método que cierra la sesión
  cerrarSesion() {
    sessionStorage.clear();
    this.ruta.navigateByUrl("/principal");
  }
}
