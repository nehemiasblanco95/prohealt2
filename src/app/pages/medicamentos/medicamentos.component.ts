import { Component, AfterViewInit } from '@angular/core';
import { MedicamentosService } from '../../servicios/servicio.index';

@Component({
	templateUrl: './medicamentos.component.html'
})
export class MedicamanetosComponent implements AfterViewInit {
	medicamentos: any;
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

	constructor(private _serviceMedicamentos: MedicamentosService) {
		this.filtros = { 'nombre': '' };
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
		this._serviceMedicamentos
			.getMedicamentosPaginado(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					console.log(data);
					this.totalItems = data.total_paginas * 10;
					this.medicamentos = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
					console.log(this.medicamentos);
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
