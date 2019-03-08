import { Component, AfterViewInit } from '@angular/core';
@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
	subtitle: string;
	version: string;
	date: string;
	cambios: string;
	constructor() {
		this.subtitle = 'Sistema de control PRO HEALTH';
		this.version = 'Version 1.5';
		this.date = 'Ultima actualizacion: 26/02/2019';
		this.cambios = 'Se agrego un nuevo cambio al sistema';
	}

	ngAfterViewInit() { }
}
