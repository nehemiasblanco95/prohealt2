import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { TipoCambioService } from "../../servicios/servicio.index";

@Component({
  selector: "app-tipo-cambio",
  templateUrl: "./tipo-cambio.component.html"
})
export class TipoCambioComponent {
  nuevo = true;
  load = true;
  editar = false;

  forma: any = {
    tipo: "",
    tipo_anterior: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _tipoService: TipoCambioService
  ) {
    this.cargarTipo();
  }

  edicion() {
    this.editar = !this.editar;
  }

  cargarTipo() {
    this.load = true;
    this._tipoService.getTipo().subscribe(
      data => {
        this.forma = data.tipo;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    );
  }

  editarTipo() {
    this.load = true;
    this._tipoService.editarTipo(this.forma).subscribe(
      data => {
this.editar = false;
this.forma.tipo_anterior = this.forma.tipo;
        this.load = false;
      },
      err => {
        this.load = false;
      }
    );
  }
}
