import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiciosRoutes } from './servicios.routing';
import { ServiciosComponent } from './servicios.component';
import { SharedModule } from '../../shared/shared.module.ts';
import { ServicioComponent } from './servicio/servicio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ServiciosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    ServiciosComponent,
    ServicioComponent
  ]
})

export class ServiciosModule { }
