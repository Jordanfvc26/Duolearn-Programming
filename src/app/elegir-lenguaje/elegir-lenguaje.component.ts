import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { LenguajesService } from '../servicios/lenguajes.service';


@Component({
  selector: 'app-elegir-lenguaje',
  templateUrl: './elegir-lenguaje.component.html',
  styleUrls: ['./elegir-lenguaje.component.css']
})
export class ElegirLenguajeComponent implements OnInit {

  constructor(private ruta: Router, public lenguajeService:LenguajesService) { }

  lenguajes=[];

  ngOnInit(): void {
    AOS.init();
    this.lenguajeService.listar_lenguajes(true).subscribe(resp=>{
      this.lenguajes=resp;
    });
  }

  redirigir(lenguaje:any) {
    sessionStorage.setItem("lenguaje",lenguaje);
    this.ruta.navigateByUrl("/dashboard");
  }
}
