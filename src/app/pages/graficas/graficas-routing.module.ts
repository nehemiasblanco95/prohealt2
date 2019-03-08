import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarrasComponent } from './barras/barras.component';

const routes: Routes = [
  {
    path: '',
    component: BarrasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficasRoutingModule { }
