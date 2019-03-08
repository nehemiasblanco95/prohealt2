import { Component, OnInit } from '@angular/core';
import { MedicamentosService, TratamientosService } from '../../servicios/servicio.index';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { Servicios } from '../../modelos/servicios.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html'
})
export class CajaComponent {
  ctabono: any;
  title = 'app';
  tab = 1;
  singleSelect: any = [];
  stringArray: any = [];
  objectsArray: any = [];
  medicamentos: any = [];
  servicios: any = [];
  options: any;
  config = {
    displayKey: "nombre",
    search: true,
    limitTo: 10
  };
  options2: any;
  config2 = {
    displayKey: "nombre",
    search: true,
    limitTo: 10
  };
  optionsPacientes: any;
  configPaciente = {
    displayKey: "nombre",
    search: true,
    limitTo: 10
  };
  pacientes: any = [];
  totalMedicamentos: any;
  totalServicios: any;
  totalTratamientos: any;
  total: any;
  totalDolares: any;
  cambioPesos: any;
  cambioDolares: any;
  idmetodo_pago: 1;
  forma = {
    idmetodo_pago: 1,
    totalPesos: 0,
    totalDolares: 0,
    idpaciente: 0,
    medicamentos: [],
    servicios: [],
    tratamientos: []
  };
  tratamientos: any = [];
  configTratamientos = {
    displayKey: "nombre",
    search: true,
    limitTo: 10
  };
  tipo_cambio: number;
  activos_plazo: any;
  optionsTratamientos: any;
  load = true;
  changeValue($event: any) {
    this.totalMedicamentos = 0;
    this.totalServicios = 0;
    this.totalTratamientos = 0;
    this.medicamentos.forEach(medicamento => {
      this.totalMedicamentos = (+this.totalMedicamentos) + (+medicamento.precio_publico * medicamento.cantidad);
    });
    this.servicios.forEach(servicio => {
      this.totalServicios = (+this.totalServicios) + (+servicio.precio_publico * servicio.cantidad);
    });
    this.tratamientos.forEach(tratamiento => {
      this.totalTratamientos = (+this.totalTratamientos) + (+tratamiento.precio_publico * tratamiento.cantidad);
    });
    this.total = this.totalMedicamentos + this.totalServicios + this.totalTratamientos;
    this.total = this.total.toFixed(2);
    this.totalDolares = (this.totalMedicamentos + this.totalServicios + this.totalTratamientos) / this.tipo_cambio;
    this.totalDolares = this.totalDolares.toFixed(2);
  }

  agregaCantidad(elemento: any) {
    elemento.cantidad += 1;
    elemento.total = +elemento.cantidad * +elemento.precio_publico;
    this.changeValue(elemento);
  }

  quitarCantidad(elemento: any) {
    if (elemento.cantidad > 1) {
      elemento.cantidad -= 1;
      elemento.total = +elemento.cantidad * +elemento.precio_publico;
      this.changeValue(elemento);
    }
  }

  efectuarPago() {

    if (this.pacientes.length >= 1) {

      this.forma = {
        idmetodo_pago: this.idmetodo_pago,
        totalPesos: this.total,
        totalDolares: this.totalDolares,
        idpaciente: this.pacientes[0].idpaciente,
        medicamentos: this.medicamentos,
        servicios: this.servicios,
        tratamientos: this.tratamientos
      };

      Swal({
        title: 'Confirmacion de pago',
        text: 'Esta a punto de registrar un pago TOTAL.',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
        reverseButtons: true,
        inputValidator: (value: any) => {
          return !value && 'Cantidad de entrada requerida!';
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          switch (this.forma.idmetodo_pago) {
            case 1:
              if (+result.value < +this.total) {
                Swal({
                  type: 'error',
                  title: 'Cantidad de pago menor a TOTAL PESOS!'
                });
              } else {
                this.cambioPesos = result.value - this.total;
                this.cambioPesos = this.cambioPesos.toFixed(2);
                this.cambioDolares = (result.value - this.total) / this.tipo_cambio;
                this.cambioDolares = this.cambioDolares.toFixed(2);

                this._medsrv.efectuarPago(this.forma).subscribe(
                  data => {
                    console.log(data);
                    Swal({
                      type: 'success',
                      title: 'Pago exitoso!',
                      html:
                        'Cambio pesos: <b>$' + this.cambioPesos + '</b><br>' +
                        'Cambio dolares: <b>$' + this.cambioDolares + '</b><br>'
                    });
                    this.reload_state();
                  },
                  err => {
                    Swal({
                      type: 'error',
                      title: err.error.mensaje
                    });
                  }
                );
              }
              break;
            case 2:
              if (+result.value < +this.totalDolares) {
                Swal({
                  type: 'error',
                  title: 'Cantidad de pago menor a TOTAL DOLARES!'
                });
              } else {
                this.cambioDolares = result.value - this.totalDolares;
                this.cambioDolares = this.cambioDolares.toFixed(2);
                this.cambioPesos = (result.value - this.totalDolares) * this.tipo_cambio;
                this.cambioPesos = this.cambioPesos.toFixed(2);

                this._medsrv.efectuarPago(this.forma).subscribe(
                  data => {
                    console.log(data);
                    Swal({
                      type: 'success',
                      title: 'Pago exitoso!',
                      html:
                        'Cambio pesos: <b>$' + this.cambioPesos + '</b><br>' +
                        'Cambio dolares: <b>$' + this.cambioDolares + '</b><br>'
                    });
                    this.reload_state();
                  },
                  err => {
                    Swal({
                      type: 'error',
                      title: err.error.mensaje
                    });
                  }
                );
              }
              break;
            case 3:
              if (+result.value >= +this.total) {
                this._medsrv.efectuarPago(this.forma).subscribe(
                  data => {
                    console.log(data);
                    Swal({
                      type: 'success',
                      title: 'Pago exitoso!'
                    });
                    this.reload_state();
                  },
                  err => {
                    Swal({
                      type: 'error',
                      title: err.error.mensaje
                    });
                  }
                );
              } else {
                Swal({
                  type: 'error',
                  title: 'Cantidad de pago menor a TOTAL PESOS!'
                });
              }
              break;
            case 4:
              if (+result.value >= +this.total) {
                this._medsrv.efectuarPago(this.forma).subscribe(
                  data => {
                    console.log(data);
                    Swal({
                      type: 'success',
                      title: 'Pago exitoso!'
                    });
                    this.reload_state();
                  },
                  err => {
                    Swal({
                      type: 'error',
                      title: err.error.mensaje
                    });
                  }
                );
              } else {
                Swal({
                  type: 'error',
                  title: 'Cantidad de pago menor a TOTAL PESOS!'
                });
              }
              break;

            default:
              break;
          }
        }
      });
    } else {
      Swal({
        type: 'error',
        title: 'Seleccione un paciente',
        text: 'Eliga un paciente de la lista para ejecutar la operacion.'
      });
    }

  }

  constructor(public _medsrv: MedicamentosService, public _tratsrv: TratamientosService) {
    this.load = true;
    this.idmetodo_pago = 1;
    this.reload_state();
  }

  verDescripcion(desc) {
    Swal({
      // type: 'error',
      title: 'Descripcion',
      html: desc,
    });
  }

  agregarTratamientoPlazo() {
    if (this.pacientes.length >= 1) {
      this.forma = {
        idmetodo_pago: this.idmetodo_pago,
        totalPesos: this.total,
        totalDolares: this.totalDolares,
        idpaciente: this.pacientes[0].idpaciente,
        medicamentos: this.medicamentos,
        servicios: this.servicios,
        tratamientos: this.tratamientos
      };
      console.log(this.pacientes);
      this._medsrv.agregarTratamientoPlazo(this.forma).subscribe(
        data => {
          this.reload_state();
          Swal({
            type: 'success',
            title: 'Tratamiento agregado a paciente!'
          });
        },
        err => {
          Swal({
            type: 'error',
            title: err.error.mensaje
          });
        }
      );
    } else {
      Swal({
        type: 'error',
        title: 'Seleccione un paciente',
        text: 'Eliga un paciente de la lista para ejecutar la operacion.'
      });
    }
  }

  reload_state() {
    this.load = true;
    this.medicamentos = [];
    this.servicios = [];
    this.tratamientos = [];
    this.pacientes = [];
    forkJoin(
      this._medsrv.getCajaCombos(),
      this._medsrv.getTipoCambio(),
      this._tratsrv.getTratamientosActivosPlazo()
    ).subscribe(([combos, tipoCambio, activosPlazo]) => {
      console.log(combos);
      if (!combos.err && !tipoCambio.err) {
        this.options = combos.datosMedicamentos;
        this.options2 = combos.datosServicios;
        this.optionsPacientes = combos.datosPacientes;
        this.optionsTratamientos = combos.datosTratamientos;
        this.tipo_cambio = tipoCambio.tipo.tipo;
        this.activos_plazo = activosPlazo.registros;
        console.log(this.tratamientos);
      }
      this.load = false;
    },
      err => {
        Swal({
          type: 'error',
          title: 'Contacte al administrador',
          text: 'No se pudo cargar el tipo de cambio ni las opciones.'
        });
        this.load = false;
      });
  }

  beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  public log(msg: string) {
    console.log(msg);
    console.log(this.ctabono);
  }

  agregarPago(idplazo, idpasiente, pago) {
    let formaPago = {

    };
    this._tratsrv.agregarPagoTratamiento(this.forma).subscribe(
      data => {
        this.reload_state();
        Swal({
          type: 'success',
          title: 'Tratamiento agregado a paciente!'
        });
      },
      err => {
        Swal({
          type: 'error',
          title: err.error.mensaje
        });
      }
    );
  }

  agregarAbono(idpaciente, idplazo) {
    Swal({
      title: 'Confirmacion de abono',
      text: 'Esta a punto de registrar un abono a un tratamiento',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      reverseButtons: true,
      inputValidator: (value: any) => {
        return !value && 'Cantidad de abono requerida!';
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        let formaAbono = {
          idpaciente: idpaciente,
          idplazo: idplazo,
          pago: result.value
        };
        this._tratsrv.agregarPagoTratamiento(formaAbono).subscribe(
          data => {
            console.log(data);
            Swal({
              type: 'success',
              title: 'Abono exitoso!',
            });
            this.reload_state();
          },
          err => {
            Swal({
              type: 'error',
              title: err.error.mensaje
            });
          }
        );
      }
    });
  }

  async agregarAbono2(idpaciente, idplazo) {
    const { value: formValues } = await Swal({
      title: 'Cantidad de abono',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="abono"> ' +
        '<input id="swal-input2" class="swal2-input" placeholder="dinero recibido">' +
        `<div class="form-group text-left">
                                    <label class="text-danger">Metodo de pago</label>
                                    <select id="swal-input3" class="custom-select col-12" id="inlineFormCustomSelect">
                                        <option value="1">Pesos (Efectivo)</option>
                                        <option value="2">Dolares (Efectivo)</option>
                                        <option value="3">Tarjeta</option>
                                    </select>
                                </div>`,
      focusConfirm: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        let inputValue = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        let inputValue2 = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        let inputValue3 = (<HTMLInputElement>document.getElementById('swal-input3')).value;
        return [
          inputValue,
          inputValue2,
          inputValue3
        ];
      }
    });

    if (formValues[0] !== "" && formValues[1] !== "" && formValues[2] !== "") {
      console.log(formValues);
      let cambioPesos: any = '0';
      let cambioDolares: any = '0';
      let abono = formValues[0];
      let proporcionado = formValues[1];
      let abonoPesos: any = '0';
      let abonoDolares: any = '0';
      let metodo_pago = formValues[2];
      switch (parseInt(formValues[2], 10)) {
        case 1:
          // pesos
          cambioPesos = proporcionado - abono;
          cambioPesos = parseFloat(cambioPesos).toFixed(2);
          cambioDolares = (proporcionado - abono) / this.tipo_cambio;
          cambioDolares = parseFloat(cambioDolares).toFixed(2);
          abonoPesos = abono;
          abonoPesos = parseFloat(abonoPesos).toFixed(2);
          abonoDolares = abono / this.tipo_cambio;
          abonoDolares = parseFloat(abonoDolares).toFixed(2);
          break;

        case 2:
          // dolares
          cambioDolares = proporcionado - abono;
          cambioDolares = parseFloat(cambioDolares).toFixed(2);
          cambioPesos = (proporcionado - abono) * this.tipo_cambio;
          cambioPesos = parseFloat(cambioPesos).toFixed(2);
          abonoPesos = abono * this.tipo_cambio;
          abonoPesos = parseFloat(abonoPesos).toFixed(2);
          abonoDolares = abono;
          abonoDolares = parseFloat(abonoDolares).toFixed(2);
          break;

        case 3:
          // tarjeta?
          abonoPesos = abono;
          abonoDolares = abono / this.tipo_cambio;
          abonoDolares = parseFloat(abonoDolares).toFixed(2);
          break;

        default:
          break;
      }
      let formaAbono = {
        idpaciente: idpaciente,
        idplazo: idplazo,
        idmetodo_pago: metodo_pago,
        pagoPesos: abonoPesos,
        pagoDolares: abonoDolares,
        tipo_cambio: this.tipo_cambio
      };
      this._tratsrv.agregarPagoTratamiento(formaAbono).subscribe(
        data => {
          console.log(data);
          Swal({
            type: 'success',
            title: 'Abono exitoso',
            html:
              'Cambio pesos: <b>$' + cambioPesos + '</b><br>' +
              'Cambio dolares: <b>$' + cambioDolares + '</b><br>'
          });
          this.reload_state();
        },
        err => {
          Swal({
            type: 'error',
            title: 'Fallo operacion de abono',
            text: err.error.mensaje
          });
        }
      );
    } else {
      Swal({
        type: 'error',
        title: 'No se capturaron algunos campos'
      });
    }
  }


}
