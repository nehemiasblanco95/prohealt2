import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from '../../../servicios/servicio.index';
import * as moment from 'moment';

@Component({
  selector: 'app-historial-listado',
  templateUrl: './historial-listado.component.html',
  styleUrls: ['./historial-listado.component.css']
})
export class HistorialListadoComponent {
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd/MM/yyyy',
    cal_days_labels: ['Do', 'Lu', 'Ma', 'Mi', 'Jue', 'Vi', 'Sa'],
    cal_full_days_lables: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    cal_months_labels: ['Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre'],
    cal_months_labels_short: ['ENE', 'FEB', 'MAR', 'ABR',
      'MAY', 'JUN', 'JUL', 'AGO', 'SEP',
      'OCT', 'NOV', 'DIC'],
    defaultOpen: false,
    closeOnSelect: false,

  };
  date2: Date = new Date();
  settings2 = {
    bigBanner: true,
    timePicker: false,
    format: 'dd/MM/yyyy',
    cal_days_labels: ['Do', 'Lu', 'Ma', 'Mi', 'Jue', 'Vi', 'Sa'],
    cal_full_days_lables: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    cal_months_labels: ['Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre'],
    cal_months_labels_short: ['ENE', 'FEB', 'MAR', 'ABR',
      'MAY', 'JUN', 'JUL', 'AGO', 'SEP',
      'OCT', 'NOV', 'DIC'],
    defaultOpen: false,
    closeOnSelect: false,

  };
  // primera tabla TODOS
  elementos: any;
  totalCount: number;
  totalItems: any;
  itemsPerPage: number;
  pageG = 1;
  rpp = 20;
  // esta es la segunda tabla con filtros
  elementos2: any;
  totalCount2: number;
  totalItems2: any;
  itemsPerPag2e: number;
  pageG2 = 1;
  rpp2 = 20;

  // totales tabla rangos
  total_salidas: any;
  total_entradas: any;
  entradas_subtotal: any;
  salidas_subtotal: any;
  entradas_total: any;
  salidas_total: any;

  page: any;
  previousPage: any;
  load = true;

  filtros: any;

  errMsj = null;



  constructor(public _medicamentosService: MedicamentosService) {
    this.filtros = { 'medicamento_nombre': '', 'usuario_nombre': '', 'accion': '' };
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
    this._medicamentosService
      .getHistorialPaginado(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          console.log(data);
          this.totalItems = data.total_paginas * 10;
          this.elementos = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }

  // Tabla de rangos opciones


  loadPage2(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData2();
    } else {
      console.log('no es distinto a prev');
    }
  }

  loadRpp2(value: number) {
    this.pageG2 = 1;
    this.rpp2 = value;
    this.loadData2();
  }

  loadData2() {
    // tslint:disable-next-line:prefer-const
    let forma = {
      fecha1: moment(this.date).format('YYYY/MM/DD'),
      fecha2: moment(this.date2).format('YYYY/MM/DD'),
      pagina: this.pageG,
      cantidad: this.rpp,
      filtros: this.filtros
    };

    this.load = true;
    this._medicamentosService
      .getHistoralRangos(forma)
      .subscribe(
        data => {
          console.log(data);
          this.entradas_total = data.entradas_total;
          this.salidas_total = data.salidas_total;
          this.total_entradas = data.total_entradas;
          this.total_salidas = data.total_salidas;
          this.entradas_subtotal = data.entradas_subtotal;
          this.salidas_subtotal = data.salidas_subtotal;
          this.totalItems2 = data.total_paginas * 10;
          this.elementos2 = data.registros;
          this.totalCount2 = data.cuantos;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }

  // Fin tabal rangos opciones

  filtrar() {
    this.pageG = 1;
    this.loadData();
  }

  buscar() {
    // tslint:disable-next-line:prefer-const
    let forma = {
      fecha1: moment(this.date).format('YYYY/MM/DD'),
      fecha2: moment(this.date2).format('YYYY/MM/DD'),
      pagina: this.pageG,
      cantidad: this.rpp,
      filtros: this.filtros
    };

    this.load = true;
    this._medicamentosService
      .getHistoralRangos(forma)
      .subscribe(
        data => {
          console.log(data);
          this.entradas_total = data.entradas_total;
          this.salidas_total = data.salidas_total;
          this.total_entradas = data.total_entradas;
          this.total_salidas = data.total_salidas;
          this.entradas_subtotal = data.entradas_subtotal;
          this.salidas_subtotal = data.salidas_subtotal;
          this.totalItems2 = data.total_paginas * 10;
          this.elementos2 = data.registros;
          this.totalCount2 = data.cuantos;
          this.load = false;
        },
        err => {
          console.log(err);
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }

}
