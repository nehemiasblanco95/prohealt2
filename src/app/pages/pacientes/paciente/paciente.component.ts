import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PacientesService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent {
  nuevo = true;
  errMsj = null;
  load = true;
  loadReq = true;

  forma: any = {
    nombre: '',
    paterno: '',
    materno: '',
    correo: '',
    telefono: '',
    celular: '',
  };

  settings = {
    bigBanner: true,
    timePicker: false,
    format: "dd/MM/yyyy",
    closeOnSelect: false,
    cal_days_labels: ["Do", "Lu", "Ma", "Mi", "Jue", "Vi", "Sa"],
    cal_full_days_lables: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ],
    cal_months_labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    cal_months_labels_short: [
      "ENE",
      "FEB",
      "MAR",
      "ABR",
      "MAY",
      "JUN",
      "JUL",
      "AGO",
      "SEP",
      "OCT",
      "NOV",
      "DIC"
    ],
    defaultOpen: false
  };

  ficha: any = {
    diagnosticos: [],
    tratamientos: []
  };

  constructor(private route: ActivatedRoute, private router: Router, private _pacienteService: PacientesService) {

    this.route.params.subscribe(parametros => {
      const idpaciente = parametros['idpaciente'];
      if (idpaciente) {
        // editar
        this.nuevo = false;
        this.cargarPaciente(idpaciente);
      } else {
        this.load = false;
      }
    });
  }

  cargarPaciente(idpaciente) {
    this.load = true;
    this._pacienteService
      .getPaciente(idpaciente)
      .subscribe(
        data => {
          console.log(data);
          this.forma = data.registros;
          this.load = false;
        },
        err => {
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );

  }

  agregarMedicamento(forma: NgForm) {
    this.load = true;
    if (this.nuevo) {
      this._pacienteService
        .agregarPaciente(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/pacientes']);
            console.log(data);
            this.load = false;
          },
          err => {
            console.log(err);
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
    } else {
      this._pacienteService
        .actualizarPaciente(this.forma)
        .subscribe(
          data => {
            this.router.navigate(['/pacientes']);
            this.load = false;
          },
          err => {
            this.errMsj = err.error.mensaje;
            this.load = false;
          }
        );
    }
  }

  agregarDiagnostico() {

    if (this.ficha.diagnostico !== "") {
      this.ficha.diagnosticos.push(this.ficha.diagnostico);
      this.ficha.diagnostico = "";
    }
    
  }

  agregarTratamiento() {

    if (this.ficha.tratamiento !== "") {
    this.ficha.tratamientos.push(this.ficha.tratamiento);
    this.ficha.tratamiento = "";
    }
  }

  quitarDiagnostico(i: any) {

    this.ficha.diagnosticos.splice(i, 1);
  }

  quitarTratamiento(i: any) {

    this.ficha.tratamientos.splice(i, 1);

  }


}
