import { Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const UsuariosRoutes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
    path: 'agregar',
    component: UsuarioComponent
  },
  {
    path: 'editar/:idusuario',
    component: UsuarioComponent
  }
];
