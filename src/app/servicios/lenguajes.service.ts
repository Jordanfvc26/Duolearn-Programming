import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LenguajesService {

  constructor(private clientHttp: HttpClient) { }

  Api: string = environment.api;

  agregar_lenguaje(datos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/lenguajes/nuevo", datos);
  }

  listar_lenguajes(): Observable<any> {
    return this.clientHttp.get(this.Api + "/admin/lenguajes/obtener");
  }

  obtener_lenguaje_por_id(id: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/admin/lenguajes/obtener/" + id);
  }

  cambiar_estado_lenguaje(id: any, estado: any): Observable<any> {
    return this.clientHttp.patch(this.Api + "/admin/lenguaje/cambiar-estado/" + id + "/" + estado, null);
  }

  nuevo_lenguaje(datos:any): Observable<any> {
    return this.clientHttp.post(this.Api + "/admin/lenguaje/agregar", datos);
  }

  editar_lenguaje(lenguajeID:number, datos: any): Observable<any> {
    return this.clientHttp.patch(this.Api + "/admin/lenguaje/modificar/"+lenguajeID, datos);
  }

  obtener_lenguaje_por_id_admin(lenguajeID: number): Observable<any> {
    return this.clientHttp.get(this.Api + "/admin/lenguajes/obtener/"+lenguajeID);
  }
}
