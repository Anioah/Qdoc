import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './Componentes/departamentos/departamentos.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsuariosComponent } from './Componentes/usuarios/usuarios.component';

export const appRoutingProviders: any[]=[];
const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'departamento',
    component:DepartamentosComponent
  },
  {
    path: 'usuario',
    component:UsuariosComponent
  },
  {
    path: '**',
    redirectTo: '/login'

  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
