import { Component, AfterViewInit } from '@angular/core';
import { UsuarioService, CiacService } from '../../../servicios/servicio.index';
import { Usuario, Directivo, Dependencias, TiposUsuario } from '../../../modelos/modelos.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements AfterViewInit {

	nuevo = true;
	errMsj = null;
	load = true;
	loadReq = true;
	dependencias: Dependencias[];
	tipos_usuario: TiposUsuario[];
	imageSrc: any;
	imagenNombre = 'Seleccione una imagen...';


	usuario = new Usuario('', '', '0', '', '', '', null, '');
	// tslint:disable-next-line:max-line-length
	constructor(public _usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) {
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
			const idusuario = parametros['idusuario'];
			if (idusuario) {
				// editar
				this.nuevo = false;
				this.usuario = new Usuario('', '', idusuario, '', '', '');
				this.cargarUsuario();
			} else {
				this.load = false;
			}
		});
	}

	cargarUsuario() {
		this.load = true;
		this._usuarioService
			.getUsuario(this.usuario.idusuario)
			.subscribe(
				data => {
					console.log(data);
					// tslint:disable-next-line:max-line-length
					this.usuario = new Usuario(data.registros.correo, '', data.registros.idusuario, data.registros.nombre, data.registros.idusuario_tipo, data.registros.activo, null, data.registros.imagen);
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
		console.log(this.usuario);
		console.log(this.load);
	}

	agregarUsuario(forma: NgForm) {
		this.load = true;
		if (this.nuevo) {
			this._usuarioService
				.agregarUsuario(this.usuario, this.usuario.imagen)
				.subscribe(
					data => {
						this.router.navigate(['/usuarios']);
						this.load = false;
					},
					err => {
						this.errMsj = err.error.mensaje;
						this.load = false;
					}
				);
		} else {
			this._usuarioService
				.actualizarUsuario(this.usuario, this.usuario.imagen)
				.subscribe(
					data => {
						this.router.navigate(['/usuarios']);
						this.load = false;
					},
					err => {
						this.errMsj = err.error.mensaje;
						this.load = false;
					}
				);
		}
	}

	cambioImg(files: FileList) {
		this.usuario.imagen = files.item(0);
		if (files.item(0)) {
			// Carga vista previa de imagen
			const file = files.item(0);
			const reader = new FileReader();
			reader.onload = (e) => { this.imageSrc = reader.result; };
			reader.readAsDataURL(file);
		}
		// ******
		// tslint:disable-next-line:triple-equals
		if (files.length == 1) {
			this.imagenNombre = files.item(0).name;
			this.imagenNombre.substr(0, 6);
		}

		if (files.length > 1) {
			this.imagenNombre = files.length + ' archivos seleccionados...';
		}
	}




}

