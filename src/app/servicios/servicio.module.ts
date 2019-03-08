import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCitasService } from './tipo-citas.service';


import {
    LoginGuard, RoleGuardService, UsuarioService, AuthService, MedicamentosService, CiacService,
    PacientesService, CitasService, ServiciosService, TratamientosService, TipoCambioService, ReportesService
} from './servicio.index';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        LoginGuard,
        UsuarioService,
        AuthService,
        CiacService,
        RoleGuardService,
        MedicamentosService,
        PacientesService,
        CitasService,
        ServiciosService,
        TratamientosService,
        TipoCambioService,
        ReportesService,
        TipoCitasService
    ],
    declarations: []
})
export class ServiceModule { }
