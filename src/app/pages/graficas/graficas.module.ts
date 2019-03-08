import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficasRoutingModule } from './graficas-routing.module';
import { BarrasComponent } from './barras/barras.component';
import { ChartsModule } from 'ng2-charts';
import { AngularDateTimePickerModule } from '../../../assets/js/angular2-datetimepicker';

@NgModule({
  imports: [
    CommonModule,
    GraficasRoutingModule,
    ChartsModule,
    AngularDateTimePickerModule
  ],
  declarations: [BarrasComponent]
})
export class GraficasModule { }
