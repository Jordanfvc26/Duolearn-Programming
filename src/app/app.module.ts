import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { PreLoaderComponent } from './pre-loader/pre-loader.component';
import { ElegirLenguajeComponent } from './elegir-lenguaje/elegir-lenguaje.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PreguntasDosComponent } from './preguntas-dos/preguntas-dos.component';
import { PreguntasTresComponent } from './preguntas-tres/preguntas-tres.component';
import { PreguntasCuatroComponent } from './preguntas-cuatro/preguntas-cuatro.component';
import { PreguntasCincoComponent } from './preguntas-cinco/preguntas-cinco.component';


import { MapaPreguntasComponent } from './mapa-preguntas/mapa-preguntas.component';
import { OlvideContraseniaComponent } from './olvide-contrasenia/olvide-contrasenia.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CoronasComponent } from './coronas/coronas.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TeoriasComponent } from './teorias/teorias.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ListComponent } from './administrador/list/list.component';
import { EditComponent } from './administrador/edit/edit.component';
import { CreateComponent } from './administrador/create/create.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminListLenguajesComponent } from './admin-list-lenguajes/admin-list-lenguajes.component';
import { AdminCrearLenguajesComponent } from './admin-crear-lenguajes/admin-crear-lenguajes.component';
import { AdminListarModulosComponent } from './admin-listar-modulos/admin-listar-modulos.component';
import { AdminCrearModulosComponent } from './admin-crear-modulos/admin-crear-modulos.component';
import { AdminEditLenguajeComponent } from './admin-edit-lenguaje/admin-edit-lenguaje.component';
import { AdminEditModulosComponent } from './admin-edit-modulos/admin-edit-modulos.component';
import { SearchPatientsPipe } from './search-registers.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrincipalComponent,
    LoginComponent,
    PreLoaderComponent,
    ElegirLenguajeComponent,
    PreguntasComponent,
    InstruccionesComponent,
    PreguntasDosComponent,
    PreguntasTresComponent,
    PreguntasCuatroComponent,
    PreguntasCincoComponent,
    MapaPreguntasComponent,
    OlvideContraseniaComponent,
    PerfilUsuarioComponent,
    CoronasComponent,
    EstadisticasComponent,
    TeoriasComponent,
    AdministradorComponent,
    ListComponent,
    EditComponent,
    CreateComponent,
    UsuariosComponent,
    AdminListLenguajesComponent,
    AdminCrearLenguajesComponent,
    AdminListarModulosComponent,
    AdminCrearModulosComponent,
    AdminEditLenguajeComponent,
    AdminEditModulosComponent,
    SearchPatientsPipe
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module.forChild(),
    SweetAlert2Module,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatPaginatorModule
    ],
  providers: [
    InstruccionesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
