import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { DepartamentosComponent } from './Componentes/departamentos/departamentos.component';
import { FormulariosComponent } from './Componentes/formularios/formularios.component';
import { HistorialComponent } from './Componentes/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DepartamentosComponent,
    FormulariosComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
