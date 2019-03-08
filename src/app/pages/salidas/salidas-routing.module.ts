import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalidasInventarioComponent } from './salidas-inventario/salidas-inventario.component';

const routes: Routes = [
  {
    path: '',
    component: SalidasInventarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidasRoutingModule { }
