import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS, APIKEY } from '../../config/config';
import { Usuario } from '../../modelos/usuario.model';

import { TOKEN } from '../../config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
declare var swal: any;


@Injectable()
export class UsuarioService {
  token: string;

  rutas = [];
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  login(usuario: Usuario) {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/login';
    return this.http
      .post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(
          resp.token
        );
        this.cargarStorage();
      });
  }

  cargarStorage() {
    if (localStorage.getItem(TOKEN)) {
      this.token = localStorage.getItem(TOKEN);
      let tkn = this.jwtHelper.decodeToken(this.token);
      this.rutas = tkn.menu;
    } else {
      this.token = '';
    }
  }

  guardarStorage(token: string) {
    localStorage.setItem(TOKEN, token);
    this.token = token;
  }

  salir() {
    localStorage.removeItem(TOKEN);
    this.rutas = [];
    this.token = '';
    this.router.navigate(['/login']);
  }

  getUsuariospaginado(pagina: number, cantidad: number, filtros: any) {
    let url = URL_SERVICIOS + '/usuariosp';
    return this.http
      .post(url, { pagina, por_pagina: cantidad, filtros })
      .map((resp: any) => {
        return resp;
      });
  }

  agregarUsuario(usuario: Usuario, fileToUpload: File) {
    let url = URL_SERVICIOS + '/usuario';
    const formData: FormData = new FormData();
    formData.append("imagen", fileToUpload);
    formData.append("data", JSON.stringify(usuario));
    return this.http.post(url, formData).map((resp: any) => {
      return resp;
    });
  }

  getUsuario(idusuario: string) {
    let url = URL_SERVICIOS + `/usuario/${idusuario}`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }

  actualizarUsuario(usuario: Usuario, fileToUpload: File) {
    let url = URL_SERVICIOS + '/usuario_edicion';
    const formData: FormData = new FormData();
    formData.append("imagen", fileToUpload);
    formData.append("data", JSON.stringify(usuario));
    return this.http.post(url, formData).map((resp: any) => {
      return resp;
    });
  }

  getTiposUsuario() {
    let url = URL_SERVICIOS + `/tipos_usuario`;
    return this.http
      .get(url)
      .map((resp: any) => {
        return resp;
      });
  }
}
