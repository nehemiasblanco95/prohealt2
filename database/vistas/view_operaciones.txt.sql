CREATE VIEW `view_operaciones` AS
SELECT o.fecha_registro as fecha, o.total_pesos as monto, m.nombre as metodo, CONCAT(p.nombre, " ", p.paterno, " ", p.materno) as paciente, u.nombre as usuario, o.tipo_cambio, o.idmetodo_pago as idmetodo FROM operaciones_caja o
JOIN metodos_pago m ON o.idmetodo_pago = m.idmetodo_pago
LEFT JOIN pacientes p ON  o.idpaciente = p.idpaciente
LEFT JOIN usuarios u ON o.idusuario = u.idusuario