import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MedicamentosRoutes } from './medicamentos.routing';
import { MedicamanetosComponent } from './medicamentos.component';
import { SharedModule } from '../../shared/shared.module.ts';
import { MedicamentoComponent } from './medicamentos/medicamento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MedicamentosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    MedicamanetosComponent,
    MedicamentoComponent
  ]
})

export class MedicamentosModule { }
