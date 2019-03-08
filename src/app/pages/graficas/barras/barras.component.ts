import { Component } from '@angular/core';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent {

  date: Date = new Date();
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

  subtitle: string;


  constructor() {
    this.subtitle = 'This is chart page.';
  }

  // This is line chart
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = [
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 90], label: 'Un medicamento' },
  ];
  public barChartColors: Array<any> = [
    { backgroundColor: '#745af2' },
    { backgroundColor: '#ffb22b' }
  ];



  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }



}
