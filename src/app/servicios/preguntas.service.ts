import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  Api: string = environment.api;

  constructor(private clientHttp: HttpClient) { }

  get_questions(datos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/actividades/obtener", datos);
  }

  get_questionsAll(): Observable<any> {
    return this.clientHttp.get(this.Api + "/actividades/obtener");
  }

  get_questionId(id: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/actividades/obtener/"+id);
  }

  send_solves(datos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/actividades/resolver", datos);
  }

  modifyActivity(datos: any): Observable<any> {
    return this.clientHttp.put(this.Api + "/admin/actividades/modificar", datos);
  }
  
  removeActivity(id: any): Observable<any> {
    return this.clientHttp.delete(this.Api + "/admin/actividades/eliminar/"+id);
  }
  realiza_pregunta(datos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/admin/actividades/agregar", datos);
  }
}
