import { Component, OnInit } from '@angular/core';
import { tap, map, switchMap, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MedicamentosService } from '../../../servicios/servicio.index';
import { Medicamento } from '../../../modelos/medicamento.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isObject } from 'util';

@Component({
  selector: 'app-entradas-inventario',
  templateUrl: './entradas-inventario.component.html',
  styleUrls: ['./entradas-inventario.component.css']
})
export class EntradasInventarioComponent implements OnInit {

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
    comentario: ''
  };

  catalogo_inventario: any;

  constructor(private _medicamentosService: MedicamentosService, private router: Router) {
    this._medicamentosService
      .getInventarioBusqueda()
      .subscribe(
        data => {

          this.catalogo_inventario = data.registros;
        },
        err => {
          this.errMsj = err.error.mensaje;
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

  guardar() {
    this.load = true;
    this._medicamentosService
      .entradaAlmacen(this.forma)
      .subscribe(
        data => {
          this.load = false;
          Swal(
            'Entrada exitosa!',
            'Elemnto agregado correctamente.',
            'success'
          ).then((result) => {
            if (result.value) {
              this.router.navigate(['/starter']);
            }
          });
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
  }



}
