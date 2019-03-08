import { Component, OnInit } from '@angular/core';
import { MedicamentosService, PacientesService } from '../../servicios/servicio.index';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html'
})
export class PacientesComponent implements OnInit {
  medicamentos: any;
  pacientes: any;
  totalItems: any;
  page: any;
  totalCount: number;
  previousPage: any;
  pageG = 1;
  rpp = 20;
  load = true;

  filtros: any;

  errMsj = null;

  constructor(private _servicePacientes: PacientesService) {
    this.filtros = { 'nombre': '', 'paterno': '', 'materno': '' };
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
    this._servicePacientes
      .getPacientesPaginado(this.pageG, this.rpp, this.filtros)
      .subscribe(
        data => {
          console.log(data);
          this.totalItems = data.total_paginas * 10;
          this.pacientes = data.registros;
          this.totalCount = data.cuantos;
          this.load = false;
          console.log(this.pacientes);
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
