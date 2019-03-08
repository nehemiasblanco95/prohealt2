import { Component, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
	templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements AfterViewInit {
	usuarios: any;
	itemsPerPage: number;
	totalItems: any;
	page: any;
	totalCount: number;
	previousPage: any;
	pageG = 1;
	rpp = 20;
	load = true;

	filtros: any;

	errMsj = null;

	constructor(public _usuarioService: UsuarioService) {
		this.filtros = { 'nombre': '', 'correo': '', 'rol': '' };
		this.loadPage(1);
	}
	ngAfterViewInit() {

	}

	loadPage(page: number) {
		if (page !== this.previousPage) {
			this.previousPage = page;
			this.loadData();
		} else {
			console.log('no es distinto a prev');
		}
	}

	loadRpp(value: number) {
		this.pageG = 1;
		this.rpp = value;
		this.loadData();
	}

	loadData() {
		this.load = true;
		this._usuarioService
			.getUsuariospaginado(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					this.totalItems = data.total_paginas * 10;
					this.usuarios = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
				},
				err => {
					this.errMsj = err.error.mensaje;
					this.load = false;
				}
			);
	}

	filtrar() {
		this.pageG = 1;
		this.loadData();
	}
}
