import { Dependencias } from './dependencias.model';

export class Usuario {
    constructor(
        public correo: string,
        public password: string,
        public idusuario?: string,
        public nombre?: string,
        public idusuario_tipo?: string,
        public activo?: string,
        public imagen?: File,
        public ruta?: any
    ) { }
}
