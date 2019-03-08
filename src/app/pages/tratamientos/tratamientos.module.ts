import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TratamientosRoutes } from './tratamientos.routing';
import { SharedModule } from '../../shared/shared.module.ts';
import { TratamientosComponent } from './tratamientos.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TratamientosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    TratamientoComponent,
    TratamientosComponent
  ]
})
export class TratamientosModule { }
