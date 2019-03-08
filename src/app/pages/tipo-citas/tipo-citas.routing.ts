
import { Routes } from "@angular/router";
import { TipoCitasComponent } from "./tipo-citas.component";
import { TipoCitaComponent } from "./tipo-cita/tipo-cita.component";


export const TipoCitasRoutes: Routes = [
    {
      path: '',
      component: TipoCitasComponent
    },
    {
      path: 'agregar',
      component: TipoCitaComponent
    },
    {
      path: 'editar/:idcitas_tipo',
      component: TipoCitaComponent
    },
  ];
