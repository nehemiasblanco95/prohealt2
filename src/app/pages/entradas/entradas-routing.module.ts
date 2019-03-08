import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradasInventarioComponent } from './entradas-inventario/entradas-inventario.component';

const routes: Routes = [
  {
    path: '',
    component: EntradasInventarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
