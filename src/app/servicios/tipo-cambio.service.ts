import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';



@Injectable()
export class TipoCambioService {
    token: string;

    constructor(public http: HttpClient, public router: Router) {

    }

    getTipo() {
        let url = URL_SERVICIOS + '/tipo_cambio';
        return this.http
            .get(url)
            .map((resp: any) => {
                return resp;
            });
    }

    editarTipo(data: any) {
        let url = URL_SERVICIOS + '/tipo_cambio';
        return this.http
            .put(url, data)
            .map((resp: any) => {
                return resp;
            });
    }



}
