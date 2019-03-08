import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { Medicamento } from '../modelos/medicamento.model';



@Injectable()
export class PacientesService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }

    getPacientesPaginado(pagina: number, cantidad: number, filtros: any) {
        let url = URL_SERVICIOS + '/pacientesp';
        return this.http
            .post(url, { pagina, por_pagina: cantidad, filtros })
            .map((resp: any) => {
                return resp;
            });
    }


    getPaciente(idpaciente: any) {
        let url = URL_SERVICIOS + '/paciente?idpaciente=' + `${idpaciente}`;
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    agregarPaciente(paciente: any) {
        let url = URL_SERVICIOS + '/paciente';
        return this.http
            .post(url, paciente)
            .map((resp: any) => {
                return resp;
            });
    }

    actualizarPaciente(paciente: any) {
        const url = URL_SERVICIOS + '/paciente';
        return this.http
            .put(url, paciente)
            .map((resp: any) => {
                return resp;
            });
    }

    entradaAlmacen(elemento: any) {
        let url = URL_SERVICIOS + '/entrada_almacen';
        return this.http
            .put(url, elemento)
            .map((resp: any) => {
                return resp;
            });
    }

    salidaAlmacen(elemento: any) {
        let url = URL_SERVICIOS + '/salida_almacen';
        return this.http
            .put(url, elemento)
            .map((resp: any) => {
                return resp;
            });
    }

    getHistorialPaginado(pagina: number, cantidad: number, filtros: any) {
        let url = URL_SERVICIOS + '/historialp';
        return this.http
            .post(url, { pagina, por_pagina: cantidad, filtros })
            .map((resp: any) => {
                return resp;
            });
    }


}
