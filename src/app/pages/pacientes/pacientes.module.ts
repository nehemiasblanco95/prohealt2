import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module.ts';
import { NgxMaskModule } from 'ngx-mask';
import { AngularDateTimePickerModule } from '../../../assets/js/angular2-datetimepicker';

@NgModule({
  imports: [
    CommonModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    AngularDateTimePickerModule
  ],
  declarations: [
    PacientesComponent,
    PacienteComponent,
  ]
})
export class PacientesModule { }
