import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ServiciosService } from "../../../servicios/servicio.index";

@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.component.html"
})
export class ServicioComponent {
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
    private _serviciosService: ServiciosService
  ) {
    this.route.params.subscribe(parametros => {
      const idservicio = parametros["idservicio"];
      if (idservicio) {
        // editar
        this.nuevo = false;
        this.cargarServicio(idservicio);
      } else {
        this.load = false;
      }
    });
  }

  cargarServicio(idservicio) {
    this.load = true;
    this._serviciosService.getServicio(idservicio).subscribe(
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

  agregarServicio() {
    this.load = true;
    if (this.nuevo) {
      this._serviciosService.agregarServicio(this.forma).subscribe(
        data => {
          this.router.navigate(["/servicios"]);
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    } else {
      this._serviciosService.editarServicio(this.forma).subscribe(
        data => {
          this.router.navigate(["/servicios"]);
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
