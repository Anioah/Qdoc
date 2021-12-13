import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { GeneralService } from 'src/app/Servicios/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  elements:Departamento={
    id:0,
    nombre:'',
    descripcion:''
  }
  departamento:Departamento[]=[]

  editar:boolean=false;
  constructor(private service:GeneralService, private router:Router) { }

  ngOnInit(): void {
    this.allDepa()
  }

  allDepa(){
    this.service.allDepa().subscribe((res:any)=>{
      this.departamento=res;
    })
  }

  async registrarDepa(){
    if (this.elements.nombre == null || this.elements.nombre == '' || this.elements.descripcion == null || this.elements.descripcion == '') {
      await Swal.fire({
        position: 'center',

        text: `Favor de ingresar los datos faltantes`,
        showConfirmButton: false,
        timer: 2000
      })
    } else {
      Swal.fire({
        text:'Departamento registrado correctamente',
        timer:2000,
        showConfirmButton:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        allowOutsideClick:false,
        icon:'success'
      })
      this.service.registrarDepa(this.elements).subscribe((res: any) => {
        
      this.refresh()
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

  refresh() {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(['departamento']);
    })
  }

  editarDepa(item:Departamento){
    
    this.editar= true;
    this.elements.id= item.id;
    this.elements.nombre=item.nombre
    this.elements.descripcion = item.descripcion
  }

  actualizarDepa(){
    Swal.fire({
      text:'Editado!',
      icon: 'success',
      showConfirmButton: false,
      timer:1500
    })
    this.service.editaDepa(this.elements).subscribe((res : any) =>{
      
      this.refresh();
    }); 
  
  }

  eliminarDepa(id:number){
    
    Swal.fire({
      title: '¿Estas seguro de eliminar el departamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Eliminido!',
          text:'El departamento ha sido eliminado.',
          icon:'success',
          showConfirmButton: false,
          timer:1500
        })
        this.service.eliminadepa(id).subscribe((res : any) =>{
        
          this.refresh();
        },error =>{
          Swal.fire({
        text:'Existe un error con tu departamento',
        timer:2000,
        showConfirmButton:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        allowOutsideClick:false,
        icon:'error'
      })
    })
  }
    })
    
  }
}
