import { Component, AfterViewInit } from '@angular/core';
import { UsuarioService, CiacService } from '../../../servicios/servicio.index';
import { Usuario, Directivo, Dependencias, TiposUsuario } from '../../../modelos/modelos.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Medicamento } from '../../../modelos/medicamento.model';
import { MedicamentosService } from '../../../servicios/medicamentos.service';

@Component({
	templateUrl: './medicamento.component.html'
})
export class MedicamentoComponent implements AfterViewInit {

	nuevo = true;
	errMsj = null;
	load = true;
	loadReq = true;
	dependencias: Dependencias[];
	tipos_usuario: TiposUsuario[];


	usuario = new Usuario('', '', '0', '', '', '');
	medicamento: Medicamento = {
		idmedicamento: 0,
		nombre: null,
		descripcion: null,
		precio_envase: null,
		precio_unitario: null,
		unidad_tipo: null,
		activo: 1,
		unidad: 1
	};
	// tslint:disable-next-line:max-line-length
	constructor(public _usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute, private _medicamentosService: MedicamentosService) {
		this._usuarioService
			.getTiposUsuario()
			.subscribe(
				data => {
					this.tipos_usuario = data.registros;
				},
				err => {
					this.errMsj = err.error.mensaje;
					this.load = false;
				}
			);

		this.route.params.subscribe(parametros => {
			const idmedicamento = parametros['idmedicamento'];
			if (idmedicamento) {
				// editar
				this.nuevo = false;
				this.cargarMedicamento(idmedicamento);
			} else {
				this.load = false;
			}
		});
	}

	cargarMedicamento(idmedicamento) {
		this.load = true;
		this._medicamentosService
			.getMedicamento(idmedicamento)
			.subscribe(
				data => {
					console.log(data);
					this.medicamento.idmedicamento = data.registros.idmedicamento;
					this.medicamento.activo = data.registros.activo;
					this.medicamento.descripcion = data.registros.descripcion;
					this.medicamento.nombre = data.registros.nombre;
					this.medicamento.precio_unitario = data.registros.precio_unitario;
					this.medicamento.precio_publico = data.registros.precio_publico;
					this.load = false;
				},
				err => {
					this.errMsj = err.error.mensaje;
					this.load = false;
				}
			);

	}

	ngAfterViewInit() {

	}

	ver() {
		console.log(this.medicamento);
		console.log(this.nuevo);
	}

	agregarMedicamento(forma: NgForm) {
		this.load = true;
		if (this.nuevo) {
			this._medicamentosService
				.agregarMedicamento(this.medicamento)
				.subscribe(
					data => {
						this.router.navigate(['/medicamentos']);
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
			this._medicamentosService
				.actualizarMedicamento(this.medicamento)
				.subscribe(
					data => {
						this.router.navigate(['/medicamentos']);
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

