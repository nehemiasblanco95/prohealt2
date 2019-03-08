CREATE VIEW `view_tratamientos` AS
SELECT a.fecha_registro as fecha, a.idmetodo_pago as idmetodo, a.pagoPesos as monto, a.tipo_cambio,m.nombre as metodo, CONCAT(p.nombre, " ", p.paterno, " ", p.materno) as paciente, u.nombre as usuario FROM pagos_tratamientos a
JOIN tratamiento_plazo tp ON a.idplazo = tp.idplazo
JOIN metodos_pago m ON a.idmetodo_pago = m.idmetodo_pago
LEFT JOIN pacientes p ON  a.idpaciente = p.idpaciente
LEFT JOIN usuarios u ON a.idusuario = u.idusuario
WHERE tp.estado = 'PENDIENTE'