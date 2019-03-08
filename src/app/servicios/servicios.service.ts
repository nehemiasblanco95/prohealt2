import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';



@Injectable()
export class ServiciosService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }

    getServicios(pagina: number, cantidad: number, filtros: any) {
        let url = URL_SERVICIOS + '/get_servicios';
        return this.http
            .post(url, { pagina, por_pagina: cantidad, filtros })
            .map((resp: any) => {
                return resp;
            });
    }

    getServicio(idservicio) {
        let url = URL_SERVICIOS + '/servicio/' + idservicio;
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }


    agregarServicio(data: any) {
        let url = URL_SERVICIOS + '/servicio';
        return this.http
          .post(url, data)
          .map((resp: any) => {
            return resp;
          });
      }

    editarServicio(data: any) {
        let url = URL_SERVICIOS + '/servicio';
        return this.http
          .put(url, data)
          .map((resp: any) => {
            return resp;
          });
      }



}
