import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as conexion from '../../../Class/url';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Documento } from '../models/documento';


interface TokenResponse {

  token: string
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  private token: string = '';
  header = new HttpHeaders()



  constructor(private http: HttpClient, private router: Router) { }


  registrarUsuario(user: User): Observable<any> {
    return this.http.post(conexion.url_http + 'register', user);
  }

  //funciones login

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken') as string;
    }
    return this.token
  }

  public getUserDetails(): User {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)

      return JSON.parse(payload)
    } else {
      return null!
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()

    if (user) {
      return true
    } else {
      return false
    }
  }

  /* Iniciar Sesión */

  public login(user: User): Observable<any> {

    const base = this.http.post<any>(conexion.url_http + 'login', user)
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        } return data
      })
    )
    return request

  }

  /* Cerrar Sesión */
  public logout() {
    this.token = '';
    return this.http.delete(conexion.url_http + 'removeAuth', {
      'headers': this.header.append('Authorization', `Bearer ${localStorage.getItem('userToken')}`)
    });
  }


  /* INFormacion del usuario */
  public getUser() {
    return this.http.get(conexion.url_http + 'getUserInfo',
      { 'headers': this.header.append('Authorization', `Bearer ${localStorage.getItem('usertoken')}`) });
  }

  public getTypeOfDocuments() {
    return this.http.get(conexion.url_http + 'getTypeDoc',
      { 'headers': this.header.append('Authorization', `Bearer ${localStorage.getItem('usertoken')}`) });
  }

  public createNewDoc(document: Documento) {
    return this.http.post(conexion.url_http + 'newDoc', document,
      { 'headers': this.header.append('Authorization', `Bearer ${localStorage.getItem('usertoken')}`) })
  }
}
