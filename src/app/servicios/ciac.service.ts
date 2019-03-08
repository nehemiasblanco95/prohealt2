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
// import { saveAs } from 'file-saver/dist/FileSaver';
// import { SolicitudesModule } from '../pages/solicitudes/solicitudes.module';


@Injectable()
export class CiacService {
  token: string;

  constructor(public http: HttpClient, public router: Router, private _jsonp: Jsonp) {

  }

  getDependencias() {
    const url = URL_SERVICIOS + `/dependencias`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getSecretarias() {
    const url = URL_SERVICIOS + `/secretarias`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }



  getSecretariaspaginado(pagina: number, cantidad: number, filtros: any) {
    const url = URL_SERVICIOS + '/secretariasp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  agregarSecretaria(secretaria: Secretaria) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/secretaria';
    return this.http
      .post(url, secretaria)
      .map((resp: any) => {
        return resp;
      });
  }

  getSecretaria(idsecretaria: string) {
    const url = URL_SERVICIOS + `/secretaria/${idsecretaria}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getCiudadanoBusqueda(term: string) {

    if (term === '') {
      return Observable.of([]);
    }

    const url = URL_SERVICIOS + '/buscar_ciudadano?nombre=' + `${term}`;

    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getUsuariosBusqueda(term: string) {

    if (term === '') {
      return Observable.of([]);
    }

    const headers = new HttpHeaders().set('app-nld', 'f6641f8b3b26c5db0822ce6067ed31e0');
    const options = {
      headers: headers
    };


    const url = 'http://localhost/MINI_CIAC/app_ws/App/busquedausuarios?nombre=' + `${term}`;

    return this.http
      .get(url, options)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getServicioBusqueda(term: string) {

    if (term === '') {
      return Observable.of([]);
    }

    const url = URL_SERVICIOS + '/buscar_servicio?servicio=' + `${term}`;

    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getDirectivoBusqueda(term: string) {

    if (term === '') {
      return Observable.of([]);
    }

    const url = URL_SERVICIOS + '/buscar_directivo?directivo=' + `${term}`;

    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getColoniaBusqueda(term: string) {

    if (term === '') {
      return Observable.of([]);
    }

    const url = URL_SERVICIOS + '/buscar_colonia?colonia=' + `${term}`;

    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getTipoRegistros() {

    const url = URL_SERVICIOS + `/tiporegistro`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp.registros;
      });
  }

  getDirectivos() {

    const url = URL_SERVICIOS + `/directivos`;
    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getServicios() {

    const url = URL_SERVICIOS + `/servicios`;
    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }

  getColonias() {

    const url = URL_SERVICIOS + `/colonias`;
    return this.http
      .get(url)
      .map((resp: any) => {

        return resp.registros;
      });
  }


  actualizarSecretaria(secretaria: Secretaria) {
    const url = URL_SERVICIOS + '/secretaria';
    return this.http
      .put(url, secretaria)
      .map((resp: any) => {
        return resp;
      });
  }

  getDependenciaspaginado(pagina: number, cantidad: number, filtros: any) {
    const url = URL_SERVICIOS + '/dependenciasp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  agregarDependencias(dependencia: Dependencias) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/dependencia';
    return this.http
      .post(url, dependencia)
      .map((resp: any) => {
        return resp;
      });
  }



  getDependencia(iddependencia: string) {
    const url = URL_SERVICIOS + `/dependencia/${iddependencia}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }



  actualizarSolicitud(solicitud: any) {
    const url = URL_SERVICIOS + '/solicitud';
    return this.http
      .put(url, solicitud)
      .map((resp: any) => {
        return resp;
      });
  }

  actualizarDependencia(dependencia: Dependencias) {
    const url = URL_SERVICIOS + '/dependencia';
    return this.http
      .put(url, dependencia)
      .map((resp: any) => {
        return resp;
      });
  }

  getServiciospaginado(pagina: number, cantidad: number, filtros: any) {
    const url = URL_SERVICIOS + '/serviciosp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  agregarServicio(servicio: Servicios) {
    const url = URL_SERVICIOS + '/servicio';
    return this.http
      .post(url, servicio)
      .map((resp: any) => {

        return resp;
      });
  }


  getServicio(idservicio: string) {
    const url = URL_SERVICIOS + `/servicio/${idservicio}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getTiposServicio() {
    const url = URL_SERVICIOS + '/tipos_servicio';
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getAllCiudadanos() {
    const url = URL_SERVICIOS + '/all_ciudadanos';
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp.registros;
      });
  }

  actualizarServicio(servicio: Servicios) {
    const url = URL_SERVICIOS + '/servicio';
    return this.http
      .put(url, servicio)
      .map((resp: any) => {
        return resp;
      });
  }

  getSolicitudespaginado(pagina: number, cantidad: number, filtros: any, idusuario: any) {
    const url = URL_SERVICIOS + '/solicitudesp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros, idusuario })
      .map((resp: any) => {
        return resp;
      });
  }

  getSolicitud(idsolicitud: number) {
    const url = URL_SERVICIOS + `/solicitud/${idsolicitud}`;
    return this.http
      .get(url)
      .map((resp: any) => {

        return resp;
      });
  }

  multiImpresion(colaImpresion) {
    const url = URL_SERVICIOS + '/pdf_multiple';
    return this.http
      .post(url, { colaImpresion }, {
        responseType: 'blob'
      })

      .map((resp: any) => {
        const downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  getExcel() {
    const url = URL_SERVICIOS + `/exportar2excel`;
    return this.http
      .get(url, { responseType: 'blob' })
      .map((resp: any) => {
        const downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  descargaReporte(fechas: any) {
    const url = URL_SERVICIOS + '/descargaexcel';
    return this.http
      .post(url, fechas, { responseType: 'blob' })
      .map((resp: any) => {
        const downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  solicitudCorreo(idsolicitud: any, email: string) {
    const httpParams = new HttpParams().set('idsolicitud', idsolicitud).set('email', email);
    const url = URL_SERVICIOS + `/solicitud_correo`;
    return this.http
      .get(url, { params: httpParams })
      .map((resp: any) => {
        return resp;
      });
  }

  cambiarEstadoSol(forma: any) {
    // tslint:disable-next-line:prefer-const

    const url = URL_SERVICIOS + '/solicitud_cam_estado';
    return this.http
      .post(url, forma)
      .map((resp: any) => {
        return resp;
      });
  }

  getCajaCombos() {
    const url = URL_SERVICIOS + `/caja_combos`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

}
