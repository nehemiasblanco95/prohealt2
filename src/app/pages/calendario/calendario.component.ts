import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  TemplateRef,
  OnInit
} from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";

import { Subject } from "rxjs";

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from "angular-calendar";
import { CitasService } from "../../servicios/servicio.index";
import { isArray } from "util";
import * as moment from "moment";
import { Router } from "@angular/router";
import { map, debounceTime } from "rxjs/operators";
import { Observable } from "rxjs";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  },
  green: {
    primary: "green",
    secondary: "#FDF1BA"
  },
};

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html"
})
export class CalendarioComponent {
  isLoading = false;
  load = true;
  citasData: any;
  errMsj: any;
  tipos: any;
  view = "week";
  // locale: string = 'es';
  viewDate: Date = new Date();
  citaData: {
    paciente: any;
    event: CalendarEvent;
  } = {
      paciente: "",
      event: null
    };

  idCita: string | number;
  fecha: Date = new Date();
  paciente: string;
  pacientes: any;
  tipo: string;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: "dd/MM/yyyy hh:mm",
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

  formaCita = {
    paciente: null,
    fecha: new Date(),
    idtipocita: "",
    mensaje: ""
  };

  formaCitaEditar = {
    paciente: null,
    fecha: new Date(),
    idtipocita: "",
    idagenda_citas: "",
    mensaje: ""
  };

  formatterPaciente = (x: { nombre: string }) => x.nombre;

  buscarPaciente = (text3$: Observable<string>) =>
    text3$.pipe(
      debounceTime(200),
      map(
        term =>
          term === ""
            ? []
            : this.pacientes
              .filter(
                p => p.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil text-white"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openEditar("Edited", event);
      }
    }
    // {
    //   label: '<i class="fa fa-fw fa-times  text-white"></i>',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   }
    // }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  // tslint:disable-next-line:no-inferrable-types
  activeDayIsOpen: boolean = true;

  @ViewChild("modalContent")
  modalContent: TemplateRef<any>;
  @ViewChild("modalEditar")
  modalEditar: TemplateRef<any>;
  constructor(
    private modal: NgbModal,
    public _citasService: CitasService,
    public router: Router
  ) {
    this.getCitas(this.view);
    this._citasService.getTipos().subscribe(data => {
      this.tipos = data.registros;
    });

    this._citasService.getPacientes().subscribe(
      data => {
        this.pacientes = data.registros;
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );

    console.log(router);
  }

  openModal(content) {
    this.formaCita.mensaje = "";
    this.modal.open(content, { size: "lg", backdrop: "static" }).result.then(
      result => {
        // Acepto modal
        this.guardarCita();
      },
      reason => {
        // cerro modal
      }
    );
  }

  openEditar(action: string, event: any): void {
    this.formaCitaEditar.mensaje = "";
    this.formaCitaEditar.fecha = event.start;
    this.formaCitaEditar.idtipocita = event.idtipocita;
    this.formaCitaEditar.idagenda_citas = event.idagenda_citas;

    this._citasService.getPaciente(event.idpaciente).subscribe(data => {
      data.registros.nombre =
        data.registros.paterno +
        " " +
        data.registros.materno +
        " " +
        data.registros.nombre;
      this.formaCitaEditar.paciente = data.registros;
    });

    this.modal.open(this.modalEditar, { size: "lg" }).result.then(
      result => {
        this.editarCita();
      },
      reason => { }
    );
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.openVer(event);
    this.refresh.next();
  }

  openVer(event: any): void {
    this.citaData.event = event;
    this._citasService.getPaciente(event.idpaciente).subscribe(data => {
      this.citaData.paciente = data.registros;
    });
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    this.events.push({
      title: "New event",
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  getCitas(view: any) {
    this.view = view;

    let fechaInicio: any;
    let fechaFinal: any;

    fechaInicio = moment(this.viewDate)
      .startOf(view)
      .format("YYYY/MM/DD HH:mm");
    fechaFinal = moment(this.viewDate)
      .endOf(view)
      .format("YYYY/MM/DD HH:mm");

    // tslint:disable-next-line:prefer-const
    let datos_vista = {
      view: view,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal
    };

    this._citasService.getCitas(datos_vista).subscribe(
      data => {
        data.registros.forEach(element => {
          element.start = new Date(element.start);
          element.end = new Date(element.end);
        });
        this.citasData = data.registros;
        this.load = false;
        if (isArray(data.registros)) {
          this.events = this.citasData;
          this.events.forEach(cita => {
            cita.actions = this.actions;
          });
          console.log(this.citasData);
        } else {
          this.events = [];
        }
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.load = false;
      }
    );
  }

  guardarCita() {

    let citaNueva = {
      fechaInicio: moment(this.formaCita.fecha).format("YYYY/MM/DD HH:mm"),
      fechaFinal: moment(this.formaCita.fecha)
        .add(1, "hour")
        .format("YYYY/MM/DD HH:mm"),
      idpaciente: this.formaCita.paciente.idpaciente,
      idtipocita: this.formaCita.idtipocita
    };

    let validacion = this.validarCita(citaNueva);
    if (validacion.error) {
      this.formaCita.mensaje = validacion.mensaje;
    } else {
      this.formaCita.mensaje = "";
      this._citasService.agregarCita(citaNueva).subscribe(
        data => {
          this.load = false;
          this.formaCita.fecha = new Date();
          this.formaCita.idtipocita = "";
          this.formaCita.mensaje = "";
          this.formaCita.paciente = null;
          this.getCitas(this.view);
        },
        err => {
          console.log(err);
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    }

  }

  editarCita() {

    let citaEditar = {
      idagenda_citas: this.formaCitaEditar.idagenda_citas,
      fechaInicio: moment(this.formaCitaEditar.fecha).format(
        "YYYY/MM/DD HH:mm"
      ),
      fechaFinal: moment(this.formaCitaEditar.fecha)
        .add(1, "hour")
        .format("YYYY/MM/DD HH:mm"),
      idpaciente: this.formaCitaEditar.paciente.idpaciente,
      idtipocita: this.formaCitaEditar.idtipocita
    };

    let validacion = this.validarCita(citaEditar);
    if (validacion.error) {
      this.formaCitaEditar.mensaje = validacion.mensaje;
    } else {
      this.formaCitaEditar.mensaje = "";
      console.log(citaEditar);
      this._citasService.editarCita(citaEditar).subscribe(
        data => {
          this.load = false;
          this.getCitas(this.view);
        },
        err => {
          console.log(err);
          this.errMsj = err.error.mensaje;
          this.load = false;
        }
      );
    }
  }

  validarCita(cita: any): any {
    if (cita.idpaciente == null || cita.idpaciente == "") {
      return {
        error: true,
        mensaje: "Seleccione un paciente válido."
      };
    } else {
      if (cita.idtipocita == null || cita.idtipocita == "") {
        return {
          error: true,
          mensaje: "Seleccione un tipo de cita válido."
        };
      } else {
        console.log(cita);
        this._citasService.citaExiste(cita).subscribe(data => {
          return {
            error: data.existe,
            mensaje: data.mensaje
          };
        });

        return false;
      }


    }
  }

  cambiarEstado(id: any, estado: any, estado_nuevo: any) {
    this._citasService.cambiarEstado(id, estado, estado_nuevo).subscribe(data => {
      this.getCitas(this.view);
    });
  }



}
