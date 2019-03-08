<?php
if (!defined('BASEPATH')) {exit('No direct script access allowed');}

function asignarMenu($idusuario_tipo)
{
    $menu = array(
        ['path' => '/starter', 'title' => 'Inicio', 'icon' => 'mdi mdi-home', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []]
    );

    $moduloPrueba = array(
        'path' => '/starter', 'title' => 'Prueba Modulo', 'icon' => 'fa fa-reddit-alien', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $pacientes = array(
        'path' => '/pacientes', 'title' => 'Pacientes', 'icon' => 'mdi mdi-account-multiple', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $calendario = array(
        'path' => '/calendario', 'title' => 'Calendario', 'icon' => 'mdi mdi-calendar-today', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $TodasSolicitudes = array(
        'path' => '/solicitudes', 'title' => 'Todas Solicitudes', 'icon' => 'mdi mdi-file-document', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $salidas_inventario = array(
        'path' => '/salidas_inventario', 'title' => 'Salidas almacen', 'icon' => 'fa fa-sign-out', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $caja = array(
        'path' => '/caja', 'title' => 'Caja', 'icon' => 'mdi mdi-cash', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []
    );

    $reportes = array(
        'path' => '', 'title' => 'Reportes', 'icon' => 'mdi mdi-menu', 'class' => 'has-arrow', 'label' => '', 'labelClass' => '', 'extralink' => false,
        'submenu' => [
            ['path' => '/reportes/operaciones', 'title' => 'Operaciones', 'icon' => 'mdi mdi-cash-multiple', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/reportes/operaciones_tipo', 'title' => 'Ventas Tipo', 'icon' => 'mdi mdi-cash-multiple', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/reportes/tratamientos', 'title' => 'Tratamientos', 'icon' => 'mdi mdi-cash-multiple', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
        ]
    );

    $componentes = array(
        'path' => '', 'title' => 'Componentes', 'icon' => 'mdi mdi-menu', 'class' => 'has-arrow', 'label' => '', 'labelClass' => '', 'extralink' => false,
        'submenu' => [
            ['path' => '/component/accordion', 'title' => 'Acordion', 'icon' => 'mdi mdi-chemical-weapon', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/component/alert', 'title' => 'Alert', 'icon' => 'mdi mdi-chemical-weapon', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/component/carousel', 'title' => 'Carousel', 'icon' => 'mdi mdi-chemical-weapon', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/component/dropdown', 'title' => 'Dropdown', 'icon' => 'mdi mdi-chemical-weapon', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],

        ]
    );

    $config = array(
        'path' => '', 'title' => 'Configuracion', 'icon' => 'mdi mdi-settings', 'class' => 'has-arrow', 'label' => '', 'labelClass' => '', 'extralink' => false,
        'submenu' => [
            ['path' => '/usuarios', 'title' => 'Usuarios', 'icon' => 'mdi mdi-account', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/medicamentos', 'title' => 'Medicamentos', 'icon' => 'mdi mdi-beaker', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/entrada_inventario', 'title' => 'Entrada almacen', 'icon' => 'fa fa-plus-square', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/historial', 'title' => 'Historial almacen', 'icon' => 'mdi mdi-history', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/servicios', 'title' => 'Servicios', 'icon' => 'fa fa-list-alt', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/tratamientos', 'title' => 'Tratamientos', 'icon' => 'fa fa-list-alt', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/tipo_cambio', 'title' => 'Tipo de Cambio', 'icon' => 'fa fa-dollar', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []],
            ['path' => '/tipo_citas', 'title' => 'Tipo de Citas', 'icon' => 'mdi mdi-history', 'class' => '', 'label' => '', 'labelClass' => '', 'extralink' => false, 'submenu' => []]
        ]
    );

    switch ($idusuario_tipo) {

        case '1':
            // Admin
            array_push($menu, $salidas_inventario, $pacientes, $calendario, $caja, $reportes, $config);
            break;
        case '2':
            //Recepcion
            array_push($menu, $pacientes, $calendario, $caja);
            break;
        case '3':
            //Sistemas
            array_push($menu, $salidas_inventario, $pacientes, $calendario, $caja, $reportes, $componentes, $config);
            break;

        default:
            # code...
            break;

    }

    return $menu;
}
