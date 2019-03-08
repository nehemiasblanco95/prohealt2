import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TipoCambioRoutes } from './tipo-cambio.routing';
import { SharedModule } from '../../shared/shared.module.ts';
import { TipoCambioComponent } from './tipo-cambio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TipoCambioRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    TipoCambioComponent,
  ]
})

export class TipoCambioModule { }
