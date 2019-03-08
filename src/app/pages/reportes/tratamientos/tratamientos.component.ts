import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReportesService } from '../../../servicios/servicio.index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.scss']
})
export class TratamientosComponent {
  pendiente_cobro: any;
  total_pendiente_cobro: any;
  date: Date = new Date();
  date2: Date = new Date();
  total_pendiente = 0;
  closeResult: string;
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
            beginAtZero: true,
            callback: function(value, index, values) {
              return '$' + index;
          }
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

  constructor(private _reportesService: ReportesService, private modalService: NgbModal) {
this.cargarGrafica();
this._reportesService.tratamientosPendientes().subscribe(
  data => {
    this.pendiente_cobro = data.registros;
    this.total_pendiente_cobro = data.total;
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
  }

  cargarGrafica = function () {
    let forma = {
      fecha1: moment(this.date).format('YYYY/MM/DD'),
      fecha2: moment(this.date2).format('YYYY/MM/DD'),
    };
    this.loading = true;
    this._reportesService.reporteTratamientos(forma).subscribe(
      data => {
        this.data_grafica = data.datos_grafica;
        this.barChartLabels = data.datos_grafica.labels;
        this.barChartData = [
          { data: data.datos_grafica.data, label: "Abonos a Tratamientos" }
        ];
        this.data_tabla = data.registros;
        this.loading = false;
        this.total_pendiente = data.total_pendiente;
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

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
   console.log(reason);
  }


}

