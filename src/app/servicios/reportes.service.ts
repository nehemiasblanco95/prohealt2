import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';
import { Jsonp, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { Dependencias, Secretaria, Servicios } from '../modelos/modelos.index';


@Injectable()
export class ReportesService {
  token: string;

  constructor(public http: HttpClient, public router: Router, private _jsonp: Jsonp) {

  }
  getOperacionesTipos() {
    let url = URL_SERVICIOS + '/operaciones_tipos';
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  reporteOperaciones(datos: any) {
    let url = URL_SERVICIOS + "/reporte_operaciones";
    return this.http.post(url, datos).map((resp: any) => {
      return resp;
    });
  }

  reporteOperacionesTipo(datos: any) {
    let url = URL_SERVICIOS + "/reporte_operaciones_tipo";
    return this.http.post(url, datos).map((resp: any) => {
      return resp;
    });
  }

  reporteTratamientos(datos: any) {
    let url = URL_SERVICIOS + "/reporte_tratamientos";
    return this.http.post(url, datos).map((resp: any) => {
      return resp;
    });
  }

  tratamientosPendientes() {
    let url = URL_SERVICIOS + "/tratamientos_pendientes";
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }


}
