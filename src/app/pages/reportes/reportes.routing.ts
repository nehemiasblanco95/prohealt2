import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OperacionesComponent } from './operaciones/operaciones.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { OperacionesTipoComponent } from './operaciones-tipo/operaciones-tipo.component';

const routes: Routes = [
    {
        path: "operaciones",
        component: OperacionesComponent
    },
    {
        path: "operaciones_tipo",
        component: OperacionesTipoComponent
    },
    {
        path: "tratamientos",
        component: TratamientosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesRoutingModule { }