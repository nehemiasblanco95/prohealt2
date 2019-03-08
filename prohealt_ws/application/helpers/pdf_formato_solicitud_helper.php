<?php

function pdf_formato_solicitud($colaImpresion)
{
    $CI = &get_instance();
    $CI->load->database();

    $CI->load->library('F_pdf');
    $CI->F_pdf = new F_pdf('P', 'mm', 'letter');
    $CI->F_pdf->Open();
    $CI->F_pdf->SetAutoPageBreak(false);
    $CI->F_pdf->AddPage();

    $contador = 0;

    foreach ($colaImpresion as $idsolicitud) {
        $contador++;
        $querySolicitud = $CI->db->get_where('view_pdf_solicitud', array('idsolicitud' => $idsolicitud), 1);
        $queryFoto = $CI->db->get_where('solicitudes_fotos', array('idsolicitud' => $idsolicitud), 1);

        if ($queryFoto && $queryFoto->num_rows() >= 1) {
            $imagen = "C:/xampp/htdocs/MINI_CIAC/dist/" . $queryFoto->row('ruta');
        } else {
            $imagen = "C:/xampp/htdocs/MINI_CIAC/dist/assets/images/imagenes/default.png";
        }


        foreach ($querySolicitud->result() as $row) {
            $folio = $row->folio;
            $fecha = $row->fecha_registro;
            $servio = utf8_decode($row->Servicio);
            $dependencia = utf8_decode($row->dependencia);
            $tipo_registro = utf8_decode($row->TipoRegistro);
            $comentarios = utf8_decode($row->comentarios);
            $idciudadano = $row->idciudadano;

            $ciudadano = $idciudadano;
            $nombre = utf8_decode($row->nombre);
            $apellido_paterno = utf8_decode($row->apellido_paterno);
            $apellido_materno = utf8_decode($row->apellido_materno);
            $telefono = utf8_decode($row->telefono);
            $calle = utf8_decode($row->calle);
            $entre_calle_1 = utf8_decode($row->entre_calle_1);
            $entre_calle_2 = utf8_decode($row->entre_calle_2);
            $numero = utf8_decode($row->numero);
            $colonia = utf8_decode($row->Colonia);
            $cp = $row->CodigoPostal;

        }

        $CI->F_pdf->SetLeftMargin(10);
        $logo = APPPATH . "/assets/images/logo.png";
        $CI->F_pdf->Image($logo, 10, null, 33.33, 18);
        $CI->F_pdf->SetY($CI->F_pdf->GetY()-10);
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(0, 4, "FOLIO: " . $folio, 0, 1, 'R');
        $CI->F_pdf->Cell(0, 4, utf8_decode("FECHA DE RECEPCIÓN: ") . $fecha, 0, 1, 'R');
        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->Cell(0, 4, "FORMATO DE SOLICITUD", 0, 0, 'C');
        $CI->F_pdf->Ln();
//
        $CI->F_pdf->SetRightMargin(108);
        $yHeader = $CI->F_pdf->GetY();
        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->SetTextColor(27, 71, 126);
        $CI->F_pdf->Cell(0, 8, "DATOS SOLICITUD", 0, 1, '');
        $CI->F_pdf->SetTextColor(0, 0, 0);

//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Servicio:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->MultiCell(0, 4, $servio, 0, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Dependencia:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->MultiCell(0, 4, $dependencia, 0, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Tipo Registro:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $tipo_registro, 0, 1, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(0, 4, "Comentarios:", 0, 1, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->MultiCell(0, 4, $comentarios, 0, '');

//
        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->SetTextColor(27, 71, 126);
        $CI->F_pdf->Cell(98, 8, utf8_decode("DIRECCIÓN"), '', 1, '');
        $CI->F_pdf->SetTextColor(0, 0, 0);
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Calle y Num.:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->MultiCell(0, 4, $calle . ' No. ' . $numero, 0, '');
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Entre Calles:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        if (empty($entre_calle_1) and empty($entre_calle_2)) {
            // vacios entre calles
            $CI->F_pdf->MultiCell(0, 4, "", 0, '');
        } else {
            $CI->F_pdf->MultiCell(0, 4, $entre_calle_1, 0, '');
            $CI->F_pdf->Cell(22, 4, "", 0, 0, '');
            $CI->F_pdf->MultiCell(0, 4, $entre_calle_2, 0, '');
        }
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Colonia:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $colonia, 0, 1, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "C.P.:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $cp, 0, 1, '');
//Otra Columna
        $CI->F_pdf->SetY($yHeader);
        $CI->F_pdf->SetLeftMargin(108);
        $CI->F_pdf->SetRightMargin(10);
        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->SetTextColor(27, 71, 126);
        $CI->F_pdf->Cell(0, 8, "DATOS CIUDADANO", '', 1, '');
        $CI->F_pdf->SetTextColor(0, 0, 0);
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Ciudadano:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        if ($ciudadano == 0) {
            $CI->F_pdf->Cell(0, 4, '', 0, 1, '');
        } else {
            $CI->F_pdf->Cell(0, 4, $ciudadano, 0, 1, '');
        }
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Nombre:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $nombre, 0, 1, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Paterno:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $apellido_paterno, 0, 1, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, "Materno:", 0, 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $apellido_materno, 0, 1, '');
//
        $CI->F_pdf->SetFont('Arial', 'B', 9);
        $CI->F_pdf->Cell(22, 4, utf8_decode("Teléfono:"), '', 0, '');
        $CI->F_pdf->SetFont('Arial', '', 10);
        $CI->F_pdf->Cell(0, 4, $telefono, '', 1, '');
        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->SetTextColor(27, 71, 126);
        $CI->F_pdf->Cell(0, 8, utf8_decode("IMAGEN:"), '', 1, '');
        $CI->F_pdf->SetTextColor(0, 0, 0);
        $CI->F_pdf->Cell(11.5, 4, "", '', 0, '');
        $CI->F_pdf->Image($imagen, null, null, 80, 60);
        $CI->F_pdf->Ln(5);

        $CI->F_pdf->SetFont('Arial', 'B', 10);
        $CI->F_pdf->Cell(0, 4, utf8_decode("FR-12-01-03 Revision 01"), '', 1, 'R');
        $CI->F_pdf->Line(0, 139.5, 216, 139.5);
        $CI->F_pdf->Ln(15);


            if ($contador % 2 == 0 && count($colaImpresion) > $contador) {
                $CI->F_pdf->AddPage();
            }


    }

    return $CI->F_pdf->Output("doc", 'I', false);
}
