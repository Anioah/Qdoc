import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import * as conexion from '../../../Class/url';
import { Departamento } from '../models/departamento';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor( private  http:HttpClient) { }

  /* DEPARTAMENTO*/
  //Registrar departamento

  registrarDepa(depa:Departamento){
    return this.http.post(conexion.url_http+ 'registrarDepa', depa);
  }

  // Obtener todos los departamentos

  allDepa(){
    return this.http.get(conexion.url_http + 'allDepa')
  }

  // Ediatar Departamento

  editaDepa(depa: any){
    return this.http.patch(conexion.url_http + 'editarDepa', depa)
  }
  
  // EliminarDepa
  eliminadepa(id:number){
    return this.http.delete(conexion.url_http + `eliminarDepa/${id}`)
  }


  /* Hsitorial */

  // Traer todos los documentos
  getDoc(){
    return this.http.get(conexion.url_http + 'getDoc')
  }
}
