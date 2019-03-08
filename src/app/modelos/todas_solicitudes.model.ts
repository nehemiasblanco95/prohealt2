export class Todas_Solicitudes {

    constructor(
        public IdSolicitud: string,
        public fecha_registro: DateTimeFormat,
        public IdServicio: string,
        public IdDependencia: string,
        public IdTipoRegistro: string,
        public Comentarios: string,
    ) { }
}
