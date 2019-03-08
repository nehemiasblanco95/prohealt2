import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCitasComponent } from './tipo-citas.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module.ts';
import { TipoCitasRoutes } from './tipo-citas.routing';
import { TipoCitaComponent } from './tipo-cita/tipo-cita.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TipoCitasRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [TipoCitasComponent, TipoCitaComponent]
})
export class TipoCitasModule { }
