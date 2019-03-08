import { Component} from '@angular/core';
import { TipoCitasService } from '../../servicios/tipo-citas.service';

@Component({
  selector: 'app-tipo-citas',
  templateUrl: './tipo-citas.component.html'
})
export class TipoCitasComponent {

  tipos: any;
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

	constructor(private _tipoService: TipoCitasService) {
		this.filtros = { 'nombre': '' };
		this.loadPage(1);
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
		this._tipoService
			.getTipos(this.pageG, this.rpp, this.filtros)
			.subscribe(
				data => {
					this.totalItems = data.total_paginas * 10;
					this.tipos = data.registros;
					this.totalCount = data.cuantos;
					this.load = false;
					console.log(this.tipos);
				},
				err => {
					this.errMsj = err.error.mensaje;
					this.load = false;
					console.log(err);
				}
			);
	}

	filtrar() {
		this.pageG = 1;
		this.loadData();
	}

}
