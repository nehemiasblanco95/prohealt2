import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialListadoComponent } from './historial-listado/historial-listado.component';
import { SharedModule } from '../../shared/shared.module.ts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDateTimePickerModule } from '../../../assets/js/angular2-datetimepicker';

@NgModule({
  imports: [
    CommonModule,
    HistorialRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularDateTimePickerModule
  ],
  declarations: [HistorialListadoComponent]
})
export class HistorialModule { }
