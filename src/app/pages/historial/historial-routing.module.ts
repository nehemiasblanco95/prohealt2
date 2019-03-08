import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialListadoComponent } from './historial-listado/historial-listado.component';

const routes: Routes = [
  {
    path: '',
    component: HistorialListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule { }
