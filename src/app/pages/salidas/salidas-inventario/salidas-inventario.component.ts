import { Component, OnInit, Injectable } from '@angular/core';
import { tap, map, switchMap, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MedicamentosService } from '../../../servicios/servicio.index';
import { Medicamento } from '../../../modelos/medicamento.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isObject } from 'util';
import { NgForm } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-salidas-inventario',
  templateUrl: './salidas-inventario.component.html'
})
export class SalidasInventarioComponent implements OnInit {
  load = false;
  load2 = false;
  errMsj: any;
  model: any;
  model4: any;
  ultimos: object;
  sinResultados = true;

  forma = {
    producto: '',
    cantidad: '',
    comentario: '',
    paciente: '',
  };

  catalogo_inventario: any;
  catalogo_pacientes: any;

  constructor(private _medicamentosService: MedicamentosService, private router: Router) {
    this.load = true;
    this._medicamentosService
      .getInventarioBusqueda()
      .subscribe(
        data => {

          this.catalogo_inventario = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          console.log(err);
          this.load = false;
        }
      );

    this._medicamentosService
      .getPacienteBusqueda()
      .subscribe(
        data => {

          this.catalogo_pacientes = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          console.log(err);
          this.load = false;
        }
      );
  }

  ngOnInit() {
  }

  cambiobusqueda(cambio) {
    if (isObject(cambio)) {
      this.load2 = true;
      this._medicamentosService
        .getUltimosMovimientos(cambio.idmedicamento)
        .subscribe(
          data => {
            this.ultimos = data.registros;
            console.log(this.ultimos);
            this.load2 = false;
            this.sinResultados = false;
          },
          err => {
            console.log('loco');
            this.sinResultados = true;
            this.load2 = false;
          }
        );
    }
  }


  formatterAlmacen = (x: { medicamento_nombre: string }) => x.medicamento_nombre;

  searchAlmacen = (text3$: Observable<string>) =>
    text3$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.catalogo_inventario.filter(v => v.medicamento_nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

  formatterPacientes = (x: { nombre: string }) => x.nombre;

  searchPacientes = (text4$: Observable<string>) =>
    text4$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.catalogo_pacientes.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))

  guardar(forma: NgForm) {
    console.log(forma.value);
    if (forma.value.paciente.idpaciente && forma.value.producto.idmedicamento) {
      console.log(forma.value);
      this.load = true;
      this._medicamentosService
        .salidaAlmacen(this.forma)
        .subscribe(
          data => {
            this.load = false;
            Swal(
              'Salida exitosa!',
              'Salida realizada correctamente.',
              'success'
            ).then((result) => {
              if (result.value) {
                this.router.navigate(['/starter']);
              }
            });
          },
          err => {
            Swal(
              'Error en salida!',
              err.error.mensaje,
              'error'
            );
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );

    } else {
      Swal(
        'Error en salida!',
        'Salida o nombre paciente mal seleccionado',
        'error'
      );
    }
  }

}
