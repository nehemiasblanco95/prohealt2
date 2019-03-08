export class Servicios {

    constructor(
        public IdServicio: string,
        public IdTipoServicio: string,
        public IdDependencia: string,
        public Servicio: string,
        public TiempoMaximo: string,
        public activo: string,
    ) { }
}
