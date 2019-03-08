import { Component, OnInit } from '@angular/core';
import { TratamientosService } from '../../servicios/tratamientos.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html'
})
export class TratamientosComponent implements OnInit {

  tartamientos: any;
  totalItems: any;
  page: any;
  totalCount: number;
  previousPage: any;
  pageG = 1;
  rpp = 20;
  load = true;

  filtros: any;

  errMsj = null;

  constructor(private _tratamientosServicios: TratamientosService) {
    this.filtros = { 'nombre': '', 'precio_publico': '', 'descripcion': '' };
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
    this._tratamientosServicios
      .getTratamientos(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          this.totalItems = data.total_paginas * 10;
          this.tartamientos = data.registros;
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

  ngOnInit() {
  }


}
