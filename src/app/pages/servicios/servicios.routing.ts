import { Routes } from '@angular/router';

import { ServiciosComponent } from './servicios.component';
import { ServicioComponent } from './servicio/servicio.component';

export const ServiciosRoutes: Routes = [
  {
    path: '',
    component: ServiciosComponent
  },
  {
    path: 'agregar',
    component: ServicioComponent
  },
  {
    path: 'editar/:idservicio',
    component: ServicioComponent
  }
];
