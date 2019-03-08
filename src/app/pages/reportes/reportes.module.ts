import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularDateTimePickerModule } from "../../../assets/js/angular2-datetimepicker";


import { OperacionesComponent } from './operaciones/operaciones.component';
import { ReportesRoutingModule } from "./reportes.routing";
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { OperacionesTipoComponent } from './operaciones-tipo/operaciones-tipo.component';

@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule,
    ChartsModule,
    NgbModule,
    AngularDateTimePickerModule
  ],
  declarations: [OperacionesComponent, TratamientosComponent, OperacionesTipoComponent]
})
export class ReportesModule { }
