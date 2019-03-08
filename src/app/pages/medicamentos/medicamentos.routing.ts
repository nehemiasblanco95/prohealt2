import { Routes } from '@angular/router';

import { MedicamanetosComponent } from './medicamentos.component';
import { MedicamentoComponent } from './medicamentos/medicamento.component';

export const MedicamentosRoutes: Routes = [
  {
    path: '',
    component: MedicamanetosComponent
  },
  {
    path: 'agregar',
    component: MedicamentoComponent
  },
  {
    path: 'editar/:idmedicamento',
    component: MedicamentoComponent
  }
];
