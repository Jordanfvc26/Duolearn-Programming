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

  obtener_preguntas_sin_resolver(usuario: any, modulo: any, tipo: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/actividades/obtener/"+usuario+"/"+modulo+"/"+tipo);
  }

  get_questionsAll(estado:boolean): Observable<any> {
    return this.clientHttp.get(this.Api + "/actividades/obtener/all?estado="+estado);
  }

  get_questionId(id: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/actividades/obtener/"+id);
  }

  send_solves(userId:any,datos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/actividades/resolver/"+userId, datos);
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
