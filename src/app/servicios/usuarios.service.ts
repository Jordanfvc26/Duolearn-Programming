import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  Api: string = environment.api;

  constructor(private clientHttp: HttpClient) { }

  user_login(datos_login: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/iniciar_sesion", datos_login);
  }

  user_register(datos_registro: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/usuario/nuevo", datos_registro);
  }

  solicita_password(usuario: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/solicitar_clave/" + usuario);
  }

  resetea_password(datos: any, token: any): Observable<any> {
    //console.log(datos);
    const opciones = {
      headers: new HttpHeaders({
        'reset': token, 'Content-Type': 'application/json', 'Accept':'*/*'
      })
    };
    return this.clientHttp.post(this.Api + "/resetear_clave", datos, opciones);
  }

  close_session(): Observable<any> {
    return this.clientHttp.get(this.Api + "/cerrar_sesion");
  }

  get_user(usuario: any): Observable<any> {
    return this.clientHttp.get(this.Api + "/usuario/datos/" + usuario);
  }

  update_info(datos_nuevos: any): Observable<any> {
    return this.clientHttp.put(this.Api + "/usuario/modificar/"+sessionStorage.getItem("user"), datos_nuevos);
  }

  update_pass(id:any,datos_nuevos: any): Observable<any> {
    return this.clientHttp.post(this.Api + "/cambio_clave/"+id, datos_nuevos);
  }

  listar_usuarios(estado:any): Observable<any> {
    return this.clientHttp.get(this.Api + "/admin/usuarios/listar?estado="+estado);
  }

  aprobar_profesor(idUser: number):Observable<any>{
    return this.clientHttp.patch(this.Api + "/profesor/aprobacion/"+idUser, null);
  }

  eliminar_usuario(idUser: number, estado:boolean):Observable<any>{
    return this.clientHttp.patch(this.Api + "/usuario/cambiar-estado/"+idUser+"/"+estado, null);
  }
}
