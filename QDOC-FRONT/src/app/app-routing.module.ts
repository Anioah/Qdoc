import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './Componentes/departamentos/departamentos.component';
import { FormulariosComponent } from './Componentes/formularios/formularios.component';
import { HistorialComponent } from './Componentes/historial/historial.component';
import { LoginComponent } from './Componentes/login/login.component';

export const appRoutingProviders: any[] = [];
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'departamento',
    component: DepartamentosComponent
  },
  {
    path: 'formulario',
    component: FormulariosComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
  },
  {
    path: '**',
    redirectTo: '/login'

  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
