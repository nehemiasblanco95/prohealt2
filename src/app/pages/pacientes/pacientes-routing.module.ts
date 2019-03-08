import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesComponent
  },
  {
    path: 'agregar',
    component: PacienteComponent
  },
  {
    path: 'editar/:idpaciente',
    component: PacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
