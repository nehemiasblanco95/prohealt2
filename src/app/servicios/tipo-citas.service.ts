import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';



@Injectable()
export class TipoCitasService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }


    getTipos(pagina: number, cantidad: number, filtros: any) {
        let url = URL_SERVICIOS + '/get_tipo_citas';
        return this.http
            .post(url, { pagina, por_pagina: cantidad, filtros })
            .map((resp: any) => {
                return resp;
            });
    }

    getTipo(idtipo) {
        let url = URL_SERVICIOS + '/tipo_cita/' + idtipo;
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }


    agregarTipo(data: any) {
        let url = URL_SERVICIOS + '/tipo_cita';
        return this.http
          .post(url, data)
          .map((resp: any) => {
            return resp;
          });
      }

    editarTipo(data: any) {
        let url = URL_SERVICIOS + '/tipo_cita';
        return this.http
          .put(url, data)
          .map((resp: any) => {
            return resp;
          });
      }



}
