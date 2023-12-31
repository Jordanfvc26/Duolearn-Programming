import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(private clientHttp: HttpClient) { }

  Api: string = environment.api;

  obtener_modulos(idLenguaje:number, estado: boolean): Observable<any> {
    return this.clientHttp.get(this.Api + "/modulo/obtener/"+idLenguaje+"?activo="+estado);
  }

  cambiar_estado_modulo(id: any, estado: any): Observable<any> {
    return this.clientHttp.patch(this.Api + "/admin/modulo/cambiar-estado/" + id + "/" + estado, null);
  }

  agregar_modulo(idLenguaje:number, body:any): Observable<any> {
    return this.clientHttp.post(this.Api + "/admin/modulo/agregar/"+idLenguaje, body);
  }

  editar_modulo(idModulo:number, body:any): Observable<any> {
    return this.clientHttp.put(this.Api + "/admin/modulo/modificar/"+idModulo, body);
  }
}
