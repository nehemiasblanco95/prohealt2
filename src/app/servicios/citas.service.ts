import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';



@Injectable()
export class CitasService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }

    getCitas(data: any) {
        let url = URL_SERVICIOS + '/get_citas';
        return this.http
            .post(url, data)
            .map((resp: any) => {
                return resp;
            });
    }

    citaExiste(data: any) {
        let url = URL_SERVICIOS + '/cita_existe';
        return this.http
            .post(url, data)
            .map((resp: any) => {
                return resp;
            });
    }

    agregarCita(cita: any) {
        let url = URL_SERVICIOS + '/cita';
        return this.http
          .post(url, cita)
          .map((resp: any) => {
            return resp;
          });
      }

    editarCita(cita: any) {
        let url = URL_SERVICIOS + '/cita';
        return this.http
          .put(url, cita)
          .map((resp: any) => {
            return resp;
          });
      }

      getTipos() {
        let url = URL_SERVICIOS + '/tipos_citas';
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    getPacientes() {
        let url = URL_SERVICIOS + '/pacientes_typehead';
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    getPaciente(idpaciente: any) {
        let url = URL_SERVICIOS + '/paciente?idpaciente=' + idpaciente;
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    cambiarEstado(idagenda_citas: any, estado: any, estado_nuevo: any ) {
        let url = URL_SERVICIOS + '/cita_cambiar_estado/' + idagenda_citas + '/' + estado + '/' + estado_nuevo;
        return this.http
          .get(url)
          .map((resp: any) => {
            return resp;
          });
      }



}
