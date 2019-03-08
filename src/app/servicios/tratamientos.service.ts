import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';



@Injectable()
export class TratamientosService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }

    getTratamientos(pagina: number, cantidad: number, filtros: any) {
        let url = URL_SERVICIOS + '/get_tratamientos';
        return this.http
            .post(url, { pagina, por_pagina: cantidad, filtros })
            .map((resp: any) => {
                return resp;
            });
    }

    getTratamiento(idtratamiento) {
        let url = URL_SERVICIOS + '/tratamiento/' + idtratamiento;
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }


    agregarTratamiento(data: any) {
        let url = URL_SERVICIOS + '/tratamiento';
        return this.http
            .post(url, data)
            .map((resp: any) => {
                return resp;
            });
    }

    editarTratamiento(data: any) {
        let url = URL_SERVICIOS + '/tratamiento';
        return this.http
            .put(url, data)
            .map((resp: any) => {
                return resp;
            });
    }

    getTratamientosActivosPlazo() {
        let url = URL_SERVICIOS + '/tratamientos_activos';
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    agregarPagoTratamiento(data: any) {
        let url = URL_SERVICIOS + '/agregar_pago';
        return this.http
            .post(url, data)
            .map((resp: any) => {
                return resp;
            });
    }



}
