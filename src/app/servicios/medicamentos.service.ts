import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { Medicamento } from '../modelos/medicamento.model';



@Injectable()
export class MedicamentosService {
  token: string;

  constructor(public http: HttpClient, public router: Router) {

  }

  getMedicamentosPaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + '/medicamentosp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  getInventarioBusqueda() {
    let url = URL_SERVICIOS + '/busqueda_inventario';
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getPacienteBusqueda() {
    let url = URL_SERVICIOS + '/busqueda_paciente';
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }
  getUltimosMovimientos(idmedicamento: any) {
    let url = URL_SERVICIOS + '/ultimos_movimientos?idmedicamento=' + `${idmedicamento}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  getMedicamento(idmedicamento: any) {
    let url = URL_SERVICIOS + '/medicamento?idmedicamento=' + `${idmedicamento}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  agregarMedicamento(medicamento: Medicamento) {
    let url = URL_SERVICIOS + '/medicamento';
    return this.http
      .post(url, medicamento)
      .map((resp: any) => {
        return resp;
      });
  }

  actualizarMedicamento(medicamento: Medicamento) {
    const url = URL_SERVICIOS + '/medicamento';
    return this.http
      .put(url, medicamento)
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

  getHistoralRangos(rangos: any) {
    let url = URL_SERVICIOS + '/historial_rangos';
    return this.http
      .post(url, rangos)
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
  getTipoCambio() {
    const url = URL_SERVICIOS + `/tipo_cambio`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  efectuarPago(forma: any) {
    let url = URL_SERVICIOS + '/efectuar_pago';
    return this.http
      .post(url, forma)
      .map((resp: any) => {
        return resp;
      });
  }

  agregarTratamientoPlazo(forma: any) {
    let url = URL_SERVICIOS + '/agregar_trat_plazo';
    return this.http
      .post(url, forma)
      .map((resp: any) => {
        return resp;
      });
  }


}
