import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { TipoCitasService } from '../../../servicios/tipo-citas.service';

@Component({
  selector: 'app-tipo-cita',
  templateUrl: './tipo-cita.component.html'
})
export class TipoCitaComponent  {

  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;

  forma: any = {
    nombre: "",
    descripcion: "",
    precio_publico: "",
    precio_p_anterior: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _tiposService: TipoCitasService
  ) {
    this.route.params.subscribe(parametros => {
      const idcitas_tipo = parametros["idcitas_tipo"];
      if (idcitas_tipo) {
        // editar
        this.nuevo = false;
        this.cargarTipo(idcitas_tipo);
      } else {
        this.load = false;
      }
    });
  }

  cargarTipo(idcitas_tipo) {
    this.load = true;
    this._tiposService.getTipo(idcitas_tipo).subscribe(
      data => {
        this.forma = data.registros;
        this.load = false;
        console.log(data);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  agregarTipo() {
    this.load = true;
    if (this.nuevo) {
      this._tiposService.agregarTipo(this.forma).subscribe(
        data => {
          this.router.navigate(["/tipo_citas"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    } else {
      this._tiposService.editarTipo(this.forma).subscribe(
        data => {
          this.router.navigate(["/tipo_citas"]);
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
