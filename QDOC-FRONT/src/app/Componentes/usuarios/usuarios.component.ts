import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Departamento } from 'src/app/models/departamento';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/Servicios/general.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  elements: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    depa:'',
    departamento:0

  }
  usuarios: User[] = []
  departamentos: Departamento[] = []
  editar: boolean = false;

  constructor(private service: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.allUser();
    this.allDepa();
  }

  allUser() {
    this.service.allUser().subscribe((res: any) => {
      this.usuarios = res;
    })
  }

  editarUser(item: User) {
    console.log(item);
    this.editar = true;
    this.elements.id = item.id;
    this.elements.username = item.username;
    this.elements.nombre = item.nombre;
    this.elements.apellidos = item.apellidos;
    this.elements.departamento = item.departamento;
    this.elements.email = item.email;
  }

  allDepa() {
    this.service.allDepa().subscribe((res: any) => {
      this.departamentos = res;
    })
  }

  refresh() {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuario']);
    })
  }

  ActualizarUser() {
    Swal.fire({
      text: 'Editado!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.service.editaUser(this.elements).subscribe((res: any) => {

      this.refresh();
    });

  }

  eliminarUser(id: number) {

    Swal.fire({
      title: '¿Estas seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminido!',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.service.eliminauser(id).subscribe((res: any) => {

          this.refresh();
        }, error => {
          Swal.fire({
            text: 'Existe un error con tu usuario',
            timer: 2000,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            icon: 'error'
          })
        })
      }
    })

  }

  async registrarUser() {
    console.log(this.elements);
    if (this.elements.departamento == null || this.elements.departamento <= 0 || this.elements.username == null || this.elements.username == ''|| this.elements.password == null || this.elements.password == ''|| this.elements.apellidos == null || this.elements.apellidos == '' || this.elements.nombre == null || this.elements.nombre == '' || this.elements.email == null || this.elements.email == '') {
      await Swal.fire({
        position: 'center',
        icon: 'error',
        text: `Favor de ingresar los datos faltantes`,
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      Swal.fire({
        text: 'Usuario registrado correctamente',
        timer: 2000,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        allowOutsideClick: false,
        icon: 'success'
      })
      this.service.registrarUser(this.elements).subscribe((res: any) => {

        this.refresh()
      }
        , error => {
          Swal.fire({
            text: 'Datos incorrectos, intentelo nuevamente',
            timer: 2000,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            allowOutsideClick: false,
            icon: 'error'
          })
        })
    }
  }

}
