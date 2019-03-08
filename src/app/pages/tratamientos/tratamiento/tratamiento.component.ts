import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TratamientosService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html'
})
export class TratamientoComponent {
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;

  forma: any = {
    nombre: '',
    descripcion: '',
    precio_publico: '',
    precio_p_anterior: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private _tratamientosService: TratamientosService) {

    this.route.params.subscribe(parametros => {
      const idtratamiento = parametros['idtratamiento'];
      console.log(parametros);
      if (idtratamiento) {
        // editar
        console.log('entro a editar');
        this.nuevo = false;
        this.cargarTratamiento(idtratamiento);
      } else {
        this.load = false;
      }
    });
  }

  cargarTratamiento(idtratamiento) {
    this.load = true;
    this._tratamientosService
      .getTratamiento(idtratamiento)
      .subscribe(
        data => {
          this.forma = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );

  }

  agregarTratamiento() {
    this.load = true;
    if (this.nuevo) {
      this._tratamientosService
        .agregarTratamiento(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/tratamientos']);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
    } else {
      this._tratamientosService
        .editarTratamiento(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/tratamientos']);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
    }
  }


}

