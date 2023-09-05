import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<boolean> {
  resolve(): Observable<any> {
    // Simplemente puedes devolver los datos aquí
    const adminData = { role: 'ADMIN', name: 'Nombre del Administrador' };
    return of(adminData);
  }
  
}
