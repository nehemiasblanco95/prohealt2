CREATE VIEW `view_operaciones_tipos` AS
SELECT od.fecha_registro as fecha, od.precio_unitario as monto, od.nombre, od.idoperacion_tipo, ot.nombre as tipo, m.nombre as metodo, CONCAT(p.nombre, " ", p.paterno, " ", p.materno) as paciente, u.nombre as usuario, oc.tipo_cambio, oc.idmetodo_pago as idmetodo FROM operaciones_detalle od
JOIN operaciones_caja oc ON od.idoperacion_caja = oc.idoperacion_caja
JOIN operaciones_tipo ot ON od.idoperacion_tipo = ot.idoperacion_tipo
JOIN metodos_pago m ON oc.idmetodo_pago = m.idmetodo_pago
LEFT JOIN pacientes p ON  oc.idpaciente = p.idpaciente
LEFT JOIN usuarios u ON oc.idusuario = u.idusuario