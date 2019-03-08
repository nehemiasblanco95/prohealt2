import { Component } from '@angular/core';
import * as moment from 'moment';
import { ReportesService } from '../../../servicios/servicio.index';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent {

  date: Date = new Date();
  date2: Date = new Date();

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

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
    // barThickness: 10
  };

  public barChartType = "horizontalBar";
  public barChartLegend = true;

  public barChartColors: Array<any> = [
    { backgroundColor: "#56638A" },
    { backgroundColor: "#009efb" }
  ];

  subtitle: string;
  data_grafica: any;
  barChartLabels: string[];
  barChartData: any[];
  data_tabla: any;
  loading = true;

  constructor(private _reportesService: ReportesService) {
this.cargarGrafica();
  }

  imprimirFechas() {
console.log(this.date);
console.log(this.date2);
  }

  cargarGrafica = function () {
    let forma = {
      fecha1: moment(this.date).format('YYYY/MM/DD'),
      fecha2: moment(this.date2).format('YYYY/MM/DD'),
    };
    this.loading = true;
    this._reportesService.reporteOperaciones(forma).subscribe(
      data => {
        this.data_grafica = data.datos_grafica;
        this.barChartLabels = data.datos_grafica.labels;
        this.barChartData = [
          { data: data.datos_grafica.data, label: "Operaciones" }
        ];
        this.data_tabla = data.registros;
        this.loading = false;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  };
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  

}
