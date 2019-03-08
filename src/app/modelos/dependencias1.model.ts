import { CiacService } from '../servicios/ciac.service';
import { Router } from '@angular/router';

export class Dependencias {
    public mensaje: string;
    private router: Router;

    constructor(
        public iddependencia: string,
        public dependencia: string,
        public idsecretaria: string,
        public cs?: CiacService,
    ) { }

    public agregar() {
        this.cs
            .agregarDependencias(this)
            .subscribe(
                data => {
                    if (!data.err) {
                        this.router.navigate(['/dependencias']);
                    } else {
                        this.mensaje = data.mensaje;
                    }
                },
                error => {
                    //
                },
                () => {
                    //
                }
            );
    }

    public cargar() {
        this.cs
            .getDependencia(this.iddependencia)
            .subscribe(
                data => {
                    if (!data.err) {
                        this.iddependencia = data.registros.iddependencia;
                        this.dependencia = data.registros.dependencia;
                        this.idsecretaria = data.registros.idsecretaria;
                    } else {
                        this.mensaje = data.mensaje;
                    }
                },
                error => {

                },
        );
    }
}
