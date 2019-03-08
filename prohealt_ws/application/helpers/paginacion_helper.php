<?php

function paginar_todo($tabla, $pagina, $por_pagina, $campos, $filtros, $order = null, $where = null)
{

    $CI = &get_instance();
    $CI->load->database();

    if (!isset($por_pagina)) {
        $por_pagina = 20;
    }

    if (!isset($pagina)) {
        $pagina = 1;
    }

    if ($where != null) {
        $CI->db->where($where);
        $CI->db->from($tabla);
        $cuantos = $CI->db->count_all_results();
    } else {
        $cuantos = $CI->db->count_all($tabla);

    }

    $total_paginas = ceil($cuantos / $por_pagina);

    if ($pagina > $total_paginas) {
        $pagina = $total_paginas;
    }

    $pagina -= 1;
    $desde = $pagina * $por_pagina;

    if ($pagina >= $total_paginas - 1) {
        $pagina_siguiente = 1;
    } else {
        $pagina_siguiente = $pagina + 2;
    }

    if ($pagina < 1) {
        $pagina_anterio = $total_paginas;
    } else {
        $pagina_anterio = $pagina;
    }
    $CI->db->select($campos);
    $CI->db->like($filtros, 'match', 'after');
    if ($order != null) {
        $CI->db->order_by($order[0], $order[1]);
    }

    if ($where != null) {
        $CI->db->where($where);
    }

    $query = $CI->db->get($tabla, $por_pagina, $desde);

    if ($query && $query->num_rows() >= 1) {
        $respuesta = array(
            'cuantos' => $cuantos,
            'total_paginas' => $total_paginas,
            'pagina_actual' => ($pagina + 1),
            'pag_siguiente' => $pagina_siguiente,
            'pag_anterior' => $pagina_anterio,
            'registros' => $query->result(),
        );

    } else {
        $respuesta = array(
            'cuantos' => null,
            'total_paginas' => null,
            'pagina_actual' => null,
            'pag_siguiente' => null,
            'pag_anterior' => null,
            'registros' => null,
            'last' => $CI->db->last_query(),
            'error' => $CI->db->error()
            ,
        );

    }

    return $respuesta;
}

function paginar_query($tabla, $pagina, $por_pagina, $campos, $jointable, $joinon)
{

    $CI = &get_instance();
    $CI->load->database();

    if (!isset($por_pagina)) {
        $por_pagina = 20;
    }

    if (!isset($pagina)) {
        $pagina = 1;
    }

    $cuantos = $CI->db->count_all($tabla);
    $total_paginas = ceil($cuantos / $por_pagina);

    if ($pagina > $total_paginas) {
        $pagina = $total_paginas;
    }

    $pagina -= 1;
    $desde = $pagina * $por_pagina;

    if ($pagina >= $total_paginas - 1) {
        $pagina_siguiente = 1;
    } else {
        $pagina_siguiente = $pagina + 2;
    }

    if ($pagina < 1) {
        $pagina_anterio = $total_paginas;
    } else {
        $pagina_anterio = $pagina;
    }
    $CI->db->select($campos);
    $CI->db->join($jointable, $joinon);
    $query = $CI->db->get($tabla, $por_pagina, $desde);

    $respuesta = array(
        'err' => false,
        'cuantos' => $cuantos,
        'total_paginas' => $total_paginas,
        'pagina_actual' => ($pagina + 1),
        'pag_siguiente' => $pagina_siguiente,
        'pag_anterior' => $pagina_anterio,
        'registros' => $query->result(),
    );

    return $respuesta;
}
