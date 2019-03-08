import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaComponent } from './caja.component';
import { SelectDropDownModule } from '../../../assets/js/ngx-select-dropdown';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module.ts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    CajaRoutingModule,
    SelectDropDownModule,
    FormsModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [CajaComponent]
})
export class CajaModule { }
