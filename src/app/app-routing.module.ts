import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElegirLenguajeComponent } from './elegir-lenguaje/elegir-lenguaje.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';
import { LoginComponent } from './login/login.component';
import { PreguntasDosComponent } from './preguntas-dos/preguntas-dos.component';
import { PreguntasTresComponent } from './preguntas-tres/preguntas-tres.component';
import { PreguntasCuatroComponent } from './preguntas-cuatro/preguntas-cuatro.component';
import { PreguntasCincoComponent } from './preguntas-cinco/preguntas-cinco.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { PrincipalComponent } from './principal/principal.component';
import { MapaPreguntasComponent } from './mapa-preguntas/mapa-preguntas.component';
import { OlvideContraseniaComponent } from './olvide-contrasenia/olvide-contrasenia.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { TeoriasComponent } from './teorias/teorias.component';
import { CoronasComponent } from './coronas/coronas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListComponent } from './administrador/list/list.component';
import { CreateComponent } from './administrador/create/create.component';
import { EditComponent } from './administrador/edit/edit.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminCrearLenguajesComponent } from './admin-crear-lenguajes/admin-crear-lenguajes.component';
import { AdminListLenguajesComponent } from './admin-list-lenguajes/admin-list-lenguajes.component';
import { AdminEditLenguajeComponent } from './admin-edit-lenguaje/admin-edit-lenguaje.component';
import { AdminListarModulosComponent } from './admin-listar-modulos/admin-listar-modulos.component';
import { AdminCrearModulosComponent } from './admin-crear-modulos/admin-crear-modulos.component';
import { AdminEditModulosComponent } from './admin-edit-modulos/admin-edit-modulos.component';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"principal"},
  {path:"dashboard", component:DashboardComponent},
  {path:"principal", component:PrincipalComponent},
  {path:"login", component:LoginComponent},
  {path:"elegir-lenguaje", component:ElegirLenguajeComponent},
  {path:"preguntas", component:PreguntasComponent},
  {path: "preguntas-dos", component:PreguntasDosComponent},
  {path: "preguntas-tres", component:PreguntasTresComponent},
  {path: "preguntas-cuatro", component:PreguntasCuatroComponent},
  {path: "preguntas-cinco", component:PreguntasCincoComponent},
  {path:"instrucciones", component:InstruccionesComponent},
  {path: "mi-perfil", component:PerfilUsuarioComponent},
  {path: "olvide-contrasenia/:token", component:OlvideContraseniaComponent},
  {path: "coronas", component:CoronasComponent},
  {path: "estadisticas", component:EstadisticasComponent},
  {path: "mapa-preguntas", component:MapaPreguntasComponent},
  {path: "teorias", component:TeoriasComponent},
  {path: "administrador", component:AdministradorComponent, children: [
    {path:"lenguaje", children: [
      {path:"list", component:AdminListLenguajesComponent},
      {path:"edit/:id", component: AdminEditLenguajeComponent},
      {path:"create", component: AdminCrearLenguajesComponent},
    ]},
    {path:"modulos", children: [
      {path:"list", component:AdminListarModulosComponent},
      {path:"create", component: AdminCrearModulosComponent},
      {path:"edit/:id", component: AdminEditModulosComponent},
    ]},
    {path:"questions", children: [
      {path:"list", component:ListComponent},
      {path:"edit/:id", component: EditComponent},
      {path:"create", component: CreateComponent},
    ]},
    {path:"users", children: [
      {path:"list", component:UsuariosComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
