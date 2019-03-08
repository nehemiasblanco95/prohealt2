export class Solicitudes {

    constructor(
        public idServicio: number,
        public idTipoRegistro: number,
        public calle: string,
        public numero: string,
        public entre_calle_1: string,
        public entre_calle_2: string,
        public comentarios: string,
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public email: string,
        public telefono: string,
        public Idcolonia: number,
        public iddirectivo: number,
        public idusuario: number,
        public idciudadano?: number,
        public idsolicitud?: number,
        public fecha?: string,
        public folio?: string,
        public estatus?: string,
        public foto?: any,
        public ruta?: string,
        public ciudadano?: any
    ) { }
}
