import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/Servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  elements:User={
    id: 0,
    username: '',
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    departamento: 0,
  }

  constructor(private service: AuthService, public router: Router) { }

  public loggedIn!: boolean;

  ngOnInit(): void {
  }

  async getUserInfo() {
    this.service.getUser().subscribe((res: any) => {
      this.elements.nombre = res[0]['username'];
      Swal.fire({
        icon: 'success',
        text: `Bienvenido ` + this.elements.nombre,
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
      })

    });
  }


  async login() {
    if (this.elements.email == null || this.elements.email == '' || this.elements.password == null || this.elements.password == '') {
      await Swal.fire({
        position: 'center',

        text: `Favor de ingresar tus datos correctamente`,
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      this.service.login(this.elements).subscribe(
        (res: any) => {
          
          this.getUserInfo();
          this.router.navigateByUrl('/departamento');
          
        }
      , error =>{
          Swal.fire({
        text:'Datos incorrectos, intentelo nuevamente',
        timer:2000,
        showConfirmButton:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        allowOutsideClick:false,
        icon:'error'
      })
      })
    }

  }

}
