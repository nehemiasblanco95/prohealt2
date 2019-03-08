import { Routes } from '@angular/router';

import { TratamientosComponent } from './tratamientos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';

export const TratamientosRoutes: Routes = [
  {
    path: '',
    component: TratamientosComponent
  },
  {
    path: 'agregar',
    component: TratamientoComponent
  },
  {
    path: 'editar/:idtratamiento',
    component: TratamientoComponent
  }
];
