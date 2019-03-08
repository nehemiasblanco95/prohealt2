<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Main extends REST_Controller
{

    public function __construct()
    {
        parent::__construct();
        // Se agregar la conexion a la base de datos a toda la clase
        $this->load->database();
    }

    public function subir_foto($idsolicitud, $foto, $sistema)
    {

        define('dir', $_SERVER['DOCUMENT_ROOT']);
        $file_name = uniqid(rand(0, 99999999999));

        list(, $foto) = explode(';', $foto);
        list(, $foto) = explode(',', $foto);

        $foto = base64_decode($foto);
        $ruta = "assets/images/imagenes/" . $file_name . ".jpg";

        if (file_put_contents(dir . "/MINI_CIAC/dist/" . $ruta, $foto)) {

            $data_limpia = array(
                'idsolicitud' => $idsolicitud,
                'ruta' => $ruta,
                'nombre_archivo' => $file_name . ".jpg",
                'sistema' => $sistema,
            );

            $insercion = $this->db->insert('solicitudes_fotos', $data_limpia);

            if ($insercion) {
                $respuesta = array(
                    'mensaje' => 'Insercion correcta',
                    'status' => 200,
                );
            } else {
                unlink(dir . "/MINI_CIAC/" . $ruta);
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    'status' => 409,
                );
            }
        } else {
            $respuesta = array(
                'mensaje' => 'No se subio la imagen.',
                'status' => 409,
            );

        }

        return $respuesta;
    }

    public function login_post()
    {

        $this->load->helper('menu');

        $time = time();
        $key = 'ultrasecreto';
        $correo = $this->post('correo');
        $password = $this->post('password');

        $where = array('correo' => $correo, 'activo' => 1);
        $this->db->select('idusuario, idusuario_tipo, nombre, password, correo, imagen');
        $query = $this->db->get_where('usuarios', $where, 1);
        if ($query && $query->num_rows() >= 1) {

            $password_payload = $query->row()->password;

            if (password_verify($password, $password_payload)) {

                $idusuario = $query->row()->idusuario;
                $idusuario_tipo = $query->row()->idusuario_tipo;
                $nombre = $query->row()->nombre;
                $correo = $query->row()->correo;
                $imagen = $query->row()->imagen;
                if ($imagen !='') {
                    $imagen = RUTA_WEB.$imagen;
                }
                $token = array(
                    'iat' => $time, // Tiempo que inició el token
                    'exp' => $time + (60 * 480), // Tiempo que expirará el token (+1 hora)
                    'data' => [ // información del usuario
                        'idusuario' => $idusuario,
                        'role' => $idusuario_tipo,
                        'nombre' => $nombre,
                        'correo' => $correo,
                        'imagen' => $imagen,
                    ],
                    'menu' => asignarMenu($idusuario_tipo),
                );

                $jwt = JWT::encode($token, $key);
                $data = array(
                    'ultimo_acceso' => date('Y-m-d h:i:s'),
                );

                $this->db->where('idusuario', $idusuario);
                $this->db->update('usuarios', $data);

                $respuesta = array(
                    'token' => $jwt,
                    'date' => date('Y-m-d h:i:s'),
                );
                $status = 200;

            } else {
                $respuesta = array(
                    'mensaje' => 'Credenciales incorrectas',
                );
                $status = 401;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
                'last' => $this->db->last_query(),
            );
            $status = 401;
        }
        $this->response($respuesta, $status);
    }

    public function validartkn_post()
    {
        $headerToken = $this->input->get_request_header('Authorization', true);
        $key = 'ultrasecreto';
        $token = $this->post('token');
        try {
            $decode = JWT::decode($token, $key, array('HS256'));
            $respuesta = array(
                'err' => false,
                'token' => $decode,
                'headertoken' => $headerToken,
            );
        } catch (Exception $e) {
            $respuesta = array(
                'err' => true,
                'mensaje' => $e->getMessage(),
                'headertoken' => $headertoken,
            );
        }
        $this->response($respuesta);
    }

    public function validarJWT($tkn)
    {
        try {
            $key = 'ultrasecreto';
            $decode = JWT::decode($tkn, $key, array('HS256'));
            return true;

        } catch (Exception $e) {
            return false;
        }
    }

    public function leerToken($tkn)
    {
        $key = 'ultrasecreto';
        try {
            $decode = JWT::decode($tkn, $key, array('HS256'));
            return $decode;
        } catch (Exception $e) {
            return false;
        }

    }

    public function usuariosp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $campos = array('*');
            $respuesta = paginar_todo('view_usuarios', $pagina, $por_pagina, $campos, $filtros);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function historialp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('fecha_movimiento', 'DESC');
            $campos = array('*');
            $respuesta = paginar_todo('view_historial', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function historial_rangos_post()
    {

        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            // se reciben las fechas
            $fecha1 = $this->post('fecha1');
            $fecha2 = $this->post('fecha2');

            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('fecha_movimiento', 'DESC');
            $where = array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59');
            $campos = array('*');
            $respuesta = paginar_todo('view_historial', $pagina, $por_pagina, $campos, $filtros, $order, $where);
            // total de entradas
            $this->db->where(array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'ENTRADA'));
            $this->db->from('view_historial');
            $total_entradas = $this->db->count_all_results();
            $respuesta['total_entradas'] = $total_entradas;
            //--
            // total de salidas
            $this->db->where(array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'SALIDA'));
            $this->db->from('view_historial');
            $total_salidas = $this->db->count_all_results();
            $respuesta['total_salidas'] = $total_salidas;
            //--
            // medicamento subtotal entradas
            $this->db->select_sum('precio_unitario');
            $entradas_subtotal = $query = $this->db->get_where('view_historial', array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'ENTRADA'));
            $respuesta['entradas_subtotal'] = $entradas_subtotal->row('precio_unitario');
            //--
            // medicamento subtotal salidas
            $this->db->select_sum('precio_unitario');
            $salidas_subtotal = $query = $this->db->get_where('view_historial', array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'SALIDA'));
            $respuesta['salidas_subtotal'] = $salidas_subtotal->row('precio_unitario');
            //--

            // medicamento subtotal entradas
            $this->db->select_sum('precio_publico');
            $entradas_total = $query = $this->db->get_where('view_historial', array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'ENTRADA'));
            $respuesta['entradas_total'] = $entradas_total->row('precio_publico');
            //--
            // medicamento subtotal salidas
            $this->db->select_sum('precio_publico');
            $salidas_total = $query = $this->db->get_where('view_historial', array('fecha_movimiento >' => $fecha1 . ' 00:00:00', 'fecha_movimiento <' => $fecha2 . ' 23:59:59', 'accion' => 'SALIDA'));
            $respuesta['salidas_total'] = $salidas_total->row('precio_publico');
            //--

            $status = 200;

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function usuario_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $post = (array) json_decode($this->post('data'));

            $idusuario = $post['idusuario'];

            if (isset($idusuario)) {
                $nombre = $post['nombre'];
                $correo = $post['correo'];
                $password = $post['password'];
                $activo = $post['activo'];
                $idusuario_tipo = $post['idusuario_tipo'];

                if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
                    // Formato correo valido
                    $data_limpia = array(
                        'nombre' => $nombre,
                        'correo' => $correo,
                        'password' => password_hash($password, PASSWORD_BCRYPT),
                        'activo' => $activo,
                        'idusuario_tipo' => $idusuario_tipo,
                    );

                    $insercion = $this->db->insert('usuarios', $data_limpia);
                    if ($insercion) {
                        $idusuario = $this->db->insert_id();
                        if (!empty($_FILES['imagen'])) {

                            if (!is_dir('./imagenes/')) {
                                mkdir('./imagenes/', 0777, true);
                            }

                            $config['upload_path'] = './imagenes/';
                            $config['allowed_types'] = 'gif|jpg|jpeg|png';
                            $config['max_size'] = '1000 KB';
                            $config['encrypt_name'] = true;
                            // $config['file_name'] = $idusuario;

                            $this->load->library("upload", $config);

                            if ($this->upload->do_upload('imagen')) {
                                $data = array("upload_data" => $this->upload->data());

                                // se inserta en la base de datos
                                $ruta = "imagenes/" . $this->upload->data('file_name');
                                $data_limpia = array(
                                    'imagen' => $ruta,
                                );

                                $this->db->where('idusuario', $idusuario);
                                $update = $this->db->set($data_limpia);
                                $update = $this->db->update('usuarios');

                            }

                        }

                        $respuesta = array(
                            'mensaje' => 'Insercion correcta',
                        );
                        $status = 200;
                    } else {
                        $respuesta = array(
                            'mensaje' => 'Error en insercion.',
                            $this->db->last_query(),
                        );
                        $status = 409;
                    }
                } else {
                    // Formato correo invalido
                    $respuesta = array(
                        'mensaje' => 'Correo invalido',
                    );
                    $status = 415;
                }
            } else {
                // invalido
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function usuario_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idusuario = $this->uri->segment(3);
            $where = array('idusuario' => $idusuario);
            $this->db->select('idusuario, nombre, correo, activo, idusuario_tipo, imagen');
            $query = $this->db->get_where('usuarios', $where, 1);


            if ($query && $query->num_rows() >= 1) {
                $datos = $query->row();

                if (!empty($datos->imagen)) {
                    $datos->imagen = RUTA_WEB. $datos->imagen;
                }


                $datos->password = "";
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'last' => $this->db->last_query(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function usuario_edicion_post()
    {
        $headerToken = apache_request_headers()['Authorization'];
        $post = (array) json_decode($this->post('data'));

        if ($this->validarJWT($headerToken)) {
            $idusuario = $post['idusuario'];

            if (isset($idusuario)) {
                $nombre = $post['nombre'];
                $correo = $post['correo'];
                $password = $post['password'];
                $activo = $post['activo'];
                $idusuario_tipo = $post['idusuario_tipo'];

                $data_limpia = array(
                    'nombre' => $nombre,
                    'correo' => $correo,
                    'activo' => $activo,
                    'idusuario_tipo' => $idusuario_tipo,
                );

                if (!empty($password)) {
                    $data_limpia["password"] = password_hash($password, PASSWORD_BCRYPT);
                }

                if (!empty($_FILES['imagen'])) {

                    if (!is_dir('./imagenes/')) {
                        mkdir('./imagenes/', 0777, true);
                    }

                    $config['upload_path'] = './imagenes/';
                    $config['allowed_types'] = 'gif|jpg|jpeg|png';
                    $config['max_size'] = '20000 KB';
                    $config['overwrite'] = true;
                    $config['encrypt_name'] = true;
                    // $config['file_name'] = $idusuario;
                    $this->load->library("upload", $config);

                    if ($this->upload->do_upload('imagen')) {
                        $data = array("upload_data" => $this->upload->data());
                        $qr = $this->db->get_where('usuarios',array('idusuario'=> $idusuario));
                        $imgRoute= $qr->row('imagen');
                        if (!empty($imgRoute)) {
                            unlink($imgRoute);
                        }
                        

                        // se inserta en la base de datos
                        $ruta = "imagenes/" . $this->upload->data('file_name');
                        $data_limpia['imagen'] = $ruta;
                    }

                }

                $this->db->where('idusuario', $idusuario);
                $update = $this->db->set($data_limpia);
                $update = $this->db->update('usuarios');
                if ($update) {
                    $respuesta = array(
                        'err' => false,
                        'mensaje' => 'Actulizado correctamente',
                        'imagenes' => $_FILES,
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'Error en actualizacion',
                    );
                    $status = 500;
                }

            } else {
                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tipos_usuario_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->db->select('idusuario_tipo,usuario_tipo');
            $this->db->where_not_in('idusuario_tipo', array(3));
            $query = $this->db->get('usuarios_tipos');
            $respuesta = array(
                'mensaje' => 'Registros cargados correctamente',
                'registros' => $query->result(),
            );
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);

    }

    // Funciones medicamentos
    public function medicamentosp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('nombre', 'ASC');
            $campos = array('idmedicamento', 'nombre', 'descripcion');
            $respuesta = paginar_todo('medicamentos', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function medicamento_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->get('idmedicamento');
            $where = array('idmedicamento' => $idmedicamento);
            $this->db->select('idmedicamento,nombre, descripcion, precio_unitario, precio_publico, activo');
            $query = $this->db->get_where('medicamentos', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $query->row(),

                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'last' => $this->db->last_query(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function medicamento_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->put('idmedicamento');
            if (isset($idmedicamento)) {

                $data_limpia = array(
                    'nombre' => strtoupper($this->put('nombre')),
                    'descripcion' => strtoupper($this->put('descripcion')),
                    'precio_unitario' => $this->put('precio_unitario'),
                    'precio_publico' => $this->put('precio_publico'),
                    'activo' => $this->put('activo'),
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                );

                $this->db->where('idmedicamento', $idmedicamento);
                $update = $this->db->set($data_limpia);
                $update = $this->db->update('medicamentos');
                if ($update) {
                    $respuesta = array(
                        'err' => false,
                        'mensaje' => 'Actulizado correctamente',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'Error en actualizacion',
                    );
                    $status = 500;
                }

            } else {
                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'Error interno',
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function busqueda_inventario_get()
    {
        $this->db->select('idmedicamento, medicamento_nombre');
        $query = $this->db->get_where('view_almacen', array('activo' => 1));
        $respuesta = array(
            'mensaje' => 'Registros cargados correctamente',
            'registros' => $query->result(),

        );
        $status = 200;

        $this->response($respuesta, $status);

    }
    public function busqueda_paciente_get()
    {
        $query = $query = $this->db->query("SELECT idpaciente, concat(paterno,' ' ,materno, ' ',nombre) as nombre FROM pacientes");
        $respuesta = array(
            'mensaje' => 'Registros cargados correctamente',
            'registros' => $query->result(),

        );
        $status = 200;

        $this->response($respuesta, $status);

    }

    public function medicamento_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->post('idmedicamento');

            if (isset($idmedicamento)) {

                // Formato correo valido
                $data_limpia = array(
                    'nombre' => strtoupper($this->post('nombre')),
                    'descripcion' => strtoupper($this->post('descripcion')),
                    'precio_envase' => $this->post('precio_envase'),
                    'precio_unitario' => $this->post('precio_unitario'),
                    'unidad_tipo' => $this->post('unidad_tipo'),
                    'unidad' => $this->post('unidad'),
                    'activo' => $this->post('activo'),
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                );

                $insercion = $this->db->insert('medicamentos', $data_limpia);

                if ($insercion) {
                    $idusuario = $this->db->insert_id();
                    $respuesta = array(
                        'mensaje' => 'Insercion correcta',

                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'mensaje' => 'Error en insercion.',
                        $this->db->last_query(),
                    );
                    $status = 409;
                }

            } else {
                // invalido
                $respuesta = array(
                    'mensaje' => 'Error interno',
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    // Fin funciones medicamentos
    public function entrada_almacen_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->put('producto')['idmedicamento'];

            if (isset($idmedicamento)) {
                $cantidad = $this->put('cantidad');
                $comentario = $this->put('comentario');
                $idusuario = $this->leerToken($headerToken)->data->idusuario;

                $queryCantidad = $this->db->query("select cantidad from almacen where idmedicamento=$idmedicamento");

                $cantidadNueva = $queryCantidad->row('cantidad') + $cantidad;


                $data_limpia = array(
                    'idmedicamento' => $idmedicamento,
                    'cantidad' => $cantidadNueva,
                    'idusuario' => $idusuario,
                    'ultimo_movimiento' => 'ENTRADA',
                    'comentario' => $comentario,
                );

                $this->db->where('idmedicamento', $idmedicamento);
                $update = $this->db->set($data_limpia);
                $update = $this->db->update('almacen');
                if ($update) {
                    $respuesta = array(
                        'err' => false,
                        'mensaje' => 'Actulizado correctamente',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'Error en actualizacion',
                    );
                    $status = 500;
                }

            } else {
                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'Error interno',
                    'put' => $this->put(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function salida_almacen_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->put('producto')['idmedicamento'];
            $idpaciente = $this->put('paciente')['idpaciente'];

            if (isset($idmedicamento)) {
                $cantidad = $this->put('cantidad');
                $comentario = strtoupper($this->put('comentario'));
                $idusuario = $this->leerToken($headerToken)->data->idusuario;

                $queryCantidad = $this->db->query("select cantidad from almacen where idmedicamento=$idmedicamento");

                $cantidadNueva = $queryCantidad->row('cantidad') - $cantidad;

                if ($cantidadNueva >= 0) {
                    $data_limpia = array(
                        'idmedicamento' => $idmedicamento,
                        'idpaciente' => $idpaciente,
                        'cantidad' => $cantidadNueva,
                        'idusuario' => $idusuario,
                        'ultimo_movimiento' => 'SALIDA',
                        'comentario' => $comentario,
                    );

                    $this->db->where('idmedicamento', $idmedicamento);
                    $update = $this->db->set($data_limpia);
                    $update = $this->db->update('almacen');
                    if ($update) {
                        $respuesta = array(
                            'err' => false,
                            'mensaje' => 'Actulizado correctamente',
                        );
                        $status = 200;
                    } else {
                        $respuesta = array(
                            'err' => true,
                            'mensaje' => 'Error en actualizacion',
                        );
                        $status = 500;
                    }

                } else {
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'No hay elementos suficientes en almacen, cantidad actual: ' . $queryCantidad->row('cantidad'),
                    );
                    $status = 500;

                }

            } else {
                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'Error interno',
                    'put' => $this->put(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function ultimos_movimientos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idmedicamento = $this->get('idmedicamento');
            $this->db->order_by('idalmacen_log', 'DESC');
            $where = array('idmedicamento' => $idmedicamento);
            $query = $this->db->get_where('view_historial', $where, 3);

            if ($query && $query->num_rows() >= 1) {
                $datos = $query->result();
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'last' => $this->db->last_query(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function pacientesp_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('paterno', 'ASC');
            $campos = array('idpaciente', 'nombre', 'paterno', 'materno');
            $respuesta = paginar_todo('pacientes', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function paciente_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            // Formato correo valido
            $data_insert = array(
                'nombre' => strtoupper($this->post('nombre')),
                'paterno' => strtoupper($this->post('paterno')),
                'materno' => strtoupper($this->post('materno')),
                'correo' => $this->post('correo'),
                'telefono' => $this->post('telefono'),
                'celular' => $this->post('celular'),
                'idusuario' => $this->leerToken($headerToken)->data->idusuario,
            );

            $insercion = $this->db->insert('pacientes', $data_insert);

            if ($insercion) {
                $idusuario = $this->db->insert_id();
                $respuesta = array(
                    'mensaje' => 'Insercion correcta',

                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    $this->db->last_query(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function paciente_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idpaciente = $this->put('idpaciente');
            if (isset($idpaciente)) {

                $data_update = array(
                    'nombre' => strtoupper($this->put('nombre')),
                    'paterno' => strtoupper($this->put('paterno')),
                    'materno' => strtoupper($this->put('materno')),
                    'correo' => $this->put('correo'),
                    'telefono' => $this->put('telefono'),
                    'celular' => $this->put('celular'),
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                );

                $this->db->where('idpaciente', $idpaciente);
                $update = $this->db->set($data_update);
                $update = $this->db->update('pacientes');
                if ($update) {
                    $respuesta = array(
                        'err' => false,
                        'mensaje' => 'Actulizado correctamente',
                    );
                    $status = 200;
                } else {
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'Error en actualizacion',
                    );
                    $status = 500;
                }

            } else {
                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'Error interno',
                    'put' => $this->put(),
                );
                $status = 500;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function paciente_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $idpaciente = $this->get('idpaciente');
            $where = array('idpaciente' => $idpaciente);
            // $this->db->select('idmedicamento,nombre, descripcion, precio_unitario, precio_publico, activo');
            $query = $this->db->get_where('pacientes', $where, 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $query->row(),

                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'last' => $this->db->last_query(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function get_citas_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $fechaInicio = $this->post('fechaInicio');
            $fechaFinal = $this->post('fechaFinal');

            $query = $this->db->select(" t.nombre as tipo, a.idagenda_citas, a.start, a.end, a.idpaciente, a.idtipocita, a.estado, CONCAT(p.nombre, ' ', p.paterno,' ', p.materno) as title")->from("agenda_citas a")->join("citas_tipos t", "a.idtipocita = t.idcitas_tipo")->join("pacientes p", "a.idpaciente = p.idpaciente")->where("a.start BETWEEN '$fechaInicio' AND '$fechaFinal'")->get();

            if ($query && $query->num_rows() >= 1) {

                $data = $query->result();

                foreach ($data as $dato) {

                    switch ($dato->estado) {
                        case 1:
                            $dato->color = [
                                'primary' => "#1E90FF",
                                'secondary' => "#D1E8FF",
                            ];
                            break;
                        case 2:
                            $dato->color = [
                                'primary' => "#E3BC08",
                                'secondary' => "#FDF1BA",
                            ];
                            break;
                        case 3:
                            $dato->color = [
                                'primary' => "#009B0C",
                                'secondary' => "#BFFFC5",
                            ];
                            break;
                        case 4:
                            $dato->color = [
                                'primary' => "#AD2121",
                                'secondary' => "#FAE3E3",
                            ];
                            break;
                    }

                }

                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $data,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'last' => $this->db->last_query(),
                    'error' => $this->db->error(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function cita_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            // Formato correo valido
            $data_insert = array(
                'start' => $this->post('fechaInicio'),
                'end' => $this->post('fechaFinal'),
                'idtipocita' => $this->post('idtipocita'),
                'idpaciente' => $this->post('idpaciente'),
            );

            $insercion = $this->db->insert('agenda_citas', $data_insert);

            if ($insercion) {
                $respuesta = array(
                    'mensaje' => 'Insercion correcta',
                    'fecha' => $this->post('fechaInicio'),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                    $this->db->last_query(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function cita_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idagenda_citas = $this->put('idagenda_citas');
            // Formato correo valido
            $data_insert = array(
                'idpaciente' => $this->put('idpaciente'),
                'start' => $this->put('fechaInicio'),
                'end' => $this->put('fechaFinal'),
                'idtipocita' => $this->put('idtipocita'),
            );

            $update = $this->db->where('idagenda_citas', $idagenda_citas)->update('agenda_citas', $data_insert);

            if ($update) {
                $respuesta = array(
                    'mensaje' => 'update correcto',
                    'fecha' => $this->post('fechaInicio'),
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en update.',
                    $this->db->last_query(),
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tipos_citas_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $query = $this->db->select('idcitas_tipo , nombre')->where('activo', 1)->get('citas_tipos');
            $respuesta = array(
                'mensaje' => 'Registros cargados correctamente',
                'registros' => $query->result(),
            );
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);

    }

    public function pacientes_typehead_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->select("CONCAT(paterno, ' ' , materno, ' ' , nombre) as nombre, idpaciente")->get('pacientes');
            $respuesta = array(
                'mensaje' => 'Registros cargados correctamente',
                'registros' => $query->result(),
            );
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);

    }

    public function cita_existe_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $start = $this->post('fechaInicio');
            $end = $this->post('fechaFinal');
            $idtipocita = $this->post('idtipocita');

            $query = $this->db->where("start BETWEEN '$fechaInicio' AND '$fechaFinal'")->where("idtipocita", $idtipocita)->get('agenda_citas', 1);

            if ($query && $query->num_rows() >= 1) {
                $respuesta = array(
                    'mensaje' => 'Ya existe una cita de el tipo seleccionado en el horario ingresado.',
                    'existe' => true,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'No se encontraron coincidencias',
                    'error' => $this->db->last_query(),
                    'existe' => false,
                );
                $status = 200;

            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);

    }

    public function get_servicios_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('nombre', 'ASC');
            $campos = array('idservicio', 'nombre', 'precio_publico', 'descripcion');
            $respuesta = paginar_todo('servicios', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function servicio_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idservicio = $this->uri->segment(3);

            $query = $this->db->where('idservicio', $idservicio)->get("servicios");

            if ($query && $query->num_rows() >= 1) {

                $data = $query->row();
                $data->precio_p_anterior = $data->precio_publico;
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $data,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function servicio_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $data_insert = array(
                'nombre' => strtoupper($this->post('nombre')),
                'precio_publico' => $this->post('precio_publico'),
                'descripcion' => $this->post('descripcion'),
            );

            $insercion = $this->db->insert('servicios', $data_insert);

            if ($insercion) {
                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function servicio_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idservicio = $this->put('idservicio');
            $nombre = strtoupper($this->put('nombre'));
            $precio_publico = $this->put('precio_publico');
            $precio_p_anterior = $this->put('precio_p_anterior');
            $descripcion = strtoupper($this->put('descripcion'));

            $this->db->trans_begin();

            if ($precio_p_anterior != $precio_publico) {

                $data_insert = array(
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                    'idservicio' => $idservicio,
                    'precio_p_anterior' => $precio_p_anterior,
                    'precio_p_nuevo' => $precio_publico,
                );

                $this->db->insert('logs_servicios', $data_insert);

            }

            $data_update = array(
                'nombre' => $nombre,
                'precio_publico' => $precio_publico,
                'descripcion' => $descripcion,
            );

            $this->db->where('idservicio', $idservicio)->update('servicios', $data_update);

            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();

                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;

            } else {

                $this->db->trans_commit();

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function get_tratamientos_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('nombre', 'ASC');
            $campos = array('idtratamiento', 'nombre', 'precio_publico', 'descripcion');
            $respuesta = paginar_todo('tratamientos', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tratamiento_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idtratamiento = $this->uri->segment(3);

            $query = $this->db->where('idtratamiento', $idtratamiento)->get("tratamientos");

            if ($query && $query->num_rows() >= 1) {

                $data = $query->row();
                $data->precio_p_anterior = $data->precio_publico;
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $data,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tratamiento_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $data_insert = array(
                'nombre' => strtoupper($this->post('nombre')),
                'precio_publico' => $this->post('precio_publico'),
                'descripcion' => $this->post('descripcion'),
            );

            $insercion = $this->db->insert('tratamientos', $data_insert);

            if ($insercion) {
                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tratamiento_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idtratamiento = $this->put('idtratamiento');
            $nombre = strtoupper($this->put('nombre'));
            $precio_publico = $this->put('precio_publico');
            $precio_p_anterior = $this->put('precio_p_anterior');
            $descripcion = strtoupper($this->put('descripcion'));

            $this->db->trans_begin();

            if ($precio_p_anterior != $precio_publico) {

                $data_insert = array(
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                    'idtratamiento' => $idtratamiento,
                    'precio_p_anterior' => $precio_p_anterior,
                    'precio_p_nuevo' => $precio_publico,
                );

                $this->db->insert('logs_tratamientos', $data_insert);

            }

            $data_update = array(
                'nombre' => $nombre,
                'precio_publico' => $precio_publico,
                'descripcion' => $descripcion,
            );

            $this->db->where('idtratamiento', $idtratamiento)->update('tratamientos', $data_update);

            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();

                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;

            } else {

                $this->db->trans_commit();

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function caja_combos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $queryServicios = $this->db->query("SELECT idservicio, nombre, descripcion, precio_publico FROM servicios");
            $queryMedicamentos = $this->db->query("SELECT almacen.idmedicamento, almacen.cantidad, medicamentos.nombre, medicamentos.precio_publico FROM almacen join medicamentos on medicamentos.idmedicamento = almacen.idmedicamento where cantidad >0");
            $queryPacientes = $this->db->query("SELECT concat(nombre , ' ', paterno, ' ', materno) as nombre, idpaciente FROM pacientes");
            $queryTratamientos = $this->db->get('tratamientos');

            $datosServicios = $queryServicios->result();
            $datosMedicamentos = $queryMedicamentos->result();
            $datosPacinetes = $queryPacientes->result();
            $datosTratamientos = $queryTratamientos->result();
            foreach ($datosServicios as $key => $value) {
                $value->cantidad = 1;
                $value->total = $value->precio_publico;
            }
            foreach ($datosMedicamentos as $key => $value) {
                $value->cantidad = 1;
                $value->total = $value->precio_publico;
            }
            foreach ($datosTratamientos as $key => $value) {
                $value->cantidad = 1;
                $value->total = $value->precio_publico;
            }

            $respuesta = array(
                'mensaje' => 'Cargado correctamente',
                'datosServicios' => $datosServicios,
                'datosMedicamentos' => $datosMedicamentos,
                'datosPacientes' => $datosPacinetes,
                'datosTratamientos' => $datosTratamientos,
            );
            $status = 200;

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function efectuar_pago_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $medicamentos = $this->post('medicamentos');
            $servicios = $this->post('servicios');
            $tratamientos = $this->post('tratamientos');

            $this->db->trans_start();
            $tipo_cambio = $this->db->limit(1)->get('tipo_cambio')->row()->tipo;

            $data_insert = array(
                'total_pesos' => $this->post('totalPesos'),
                'total_dolares' => $this->post('totalDolares'),
                'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                'idpaciente' => $this->post('idpaciente'),
                'idmetodo_pago' => $this->post('idmetodo_pago'),
                'tipo_cambio' => $tipo_cambio,
            );

            $this->db->insert('operaciones_caja', $data_insert);
            $idoperacion_caja = $this->db->insert_id();

            foreach ($medicamentos as $key => $medicamento) {
                $queryCantidad = $this->db->query("select cantidad from almacen where idmedicamento=" . $medicamento['idmedicamento']);
                $cantidadNueva = $queryCantidad->row('cantidad') - $medicamento['cantidad'];

                if ($cantidadNueva >= 0) {
                    $data_limpia = array(
                        'idpaciente' => $this->post('idpaciente'),
                        'cantidad' => $cantidadNueva,
                        'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                        'ultimo_movimiento' => 'SALIDA',
                        'comentario' => 'Salida caja.',
                    );

                    $this->db->set($data_limpia);
                    $update = $this->db->where('idmedicamento', $medicamento['idmedicamento']);
                    $this->db->update('almacen');

                    $data_detalle = array(
                        'idoperacion_caja' => $idoperacion_caja,
                        'nombre' => $medicamento['nombre'],
                        'precio_unitario' => $medicamento['precio_publico'],
                        'cantidad' => $medicamento['cantidad'],
                        'total' => $medicamento['total'],
                        'idoperacion_tipo' => 1,
                    );
                    $this->db->insert('operaciones_detalle', $data_detalle);

                } else {
                    $this->db->get("err");
                    $respuesta = array(
                        'err' => true,
                        'mensaje' => 'No hay elementos suficientes en almacen de medicamentos',
                    );
                    $status = 500;

                }

            }

            foreach ($servicios as $key => $servicio) {
                $data_detalle = array(
                    'idoperacion_caja' => $idoperacion_caja,
                    'nombre' => $servicio['nombre'],
                    'precio_unitario' => $servicio['precio_publico'],
                    'cantidad' => $servicio['cantidad'],
                    'total' => $servicio['total'],
                    'idoperacion_tipo' => 2,
                );
                $this->db->insert('operaciones_detalle', $data_detalle);

            }

            foreach ($tratamientos as $key => $tratamiento) {
                $data_detalle = array(
                    'idoperacion_caja' => $idoperacion_caja,
                    'nombre' => $tratamiento['nombre'],
                    'precio_unitario' => $tratamiento['precio_publico'],
                    'cantidad' => $tratamiento['cantidad'],
                    'total' => $tratamiento['total'],
                    'idoperacion_tipo' => 3,
                );
                $this->db->insert('operaciones_detalle', $data_detalle);

            }

            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                // $respuesta = array(
                //     'mensaje' => 'Error en insercion.',
                // );
                // $status = 409;
            } else {

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tipo_cambio_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $query = $this->db->limit(1)->get("tipo_cambio");

            if ($query && $query->num_rows() >= 1) {

                $data = $query->row();
                $data->tipo_anterior = $data->tipo;
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'tipo' => $data,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'error' => $this->db->error(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tipo_cambio_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $tipo = $this->put('tipo');
            $tipo_anterior = $this->put('tipo_anterior');

            $this->db->trans_begin();

            if ($tipo != $tipo_anterior) {

                $data_insert = array(
                    'idusuario' => $this->leerToken($headerToken)->data->idusuario,
                    'tipo_anterior' => $tipo_anterior,
                    'tipo_nuevo' => $tipo,
                );

                $this->db->insert('logs_tipo_cambio', $data_insert);

            }

            $data_update = array(
                'tipo' => $tipo,
            );

            $this->db->update('tipo_cambio', $data_update);

            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();

                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;

            } else {

                $this->db->trans_commit();

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function agregar_trat_plazo_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $tratamientos = $this->post('tratamientos');
            $idpaciente = $this->post('idpaciente');

            $this->db->trans_start();

            foreach ($tratamientos as $key => $tratamiento) {
                $data_tratamiento = array(
                    'idtratamiento' => $tratamiento['idtratamiento'],
                    'idpaciente' => $idpaciente,
                    'precio_tratamiento' => $tratamiento['precio_publico'],
                    'pendiente' => $tratamiento['precio_publico'],
                    'estado' => 'PENDIENTE',
                );
                $this->db->insert('tratamiento_plazo', $data_tratamiento);

            }

            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.' . $this->db->last_query(),
                );
                $status = 409;
            } else {

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tratamientos_activos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->query("SELECT distinct(pacientes.idpaciente), concat(pacientes.paterno, ' ',pacientes.materno, ' ',pacientes.nombre) as nombre FROM tratamiento_plazo join pacientes on tratamiento_plazo.idpaciente = pacientes.idpaciente where tratamiento_plazo.estado <> 'PAGADO'");
            $pacientes = $query->result();

            $datos = [];

            foreach ($pacientes as $key => $paciente) {

                $idpaciente = $paciente->idpaciente;
                $tratamientos = $this->db->query("SELECT idplazo, tratamientos.nombre as tratamiento, tratamiento_plazo.idpaciente, concat(pacientes.paterno, ' ',pacientes.materno, ' ',pacientes.nombre) as nombre, precio_tratamiento, estado, pendiente FROM tratamiento_plazo join pacientes on pacientes.idpaciente=tratamiento_plazo.idpaciente join tratamientos on tratamiento_plazo.idtratamiento=tratamientos.idtratamiento where tratamiento_plazo.idpaciente=$idpaciente and estado <> 'PAGADO'");
                $tratamiento_paciente = $tratamientos->result();
                foreach ($tratamiento_paciente as $key => $tratamiento) {
                    $idplazo = $tratamiento->idplazo;
                    $pagos = $this->db->get_where('pagos_tratamientos', array('idplazo' => $idplazo));
                    $tratamiento->pagos = $pagos->result();
                }
                $paciente_array = array(
                    'nombre' => $paciente->nombre,
                    'detalle' => $tratamiento_paciente,
                );
                array_push($datos, $paciente_array);
            }

            $respuesta = array(
                'mensaje' => 'Cargado correctamente',
                'registros' => $datos,
            );
            $status = 200;

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function agregar_pago_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idplazo = $this->post('idplazo');
            $idpaciente = $this->post('idpaciente');
            $pagoPesos = $this->post('pagoPesos');
            $pagoDolares = $this->post('pagoDolares');
            $tipo_cambio = $this->post('tipo_cambio');
            $idmetodo_pago = $this->post('idmetodo_pago');

            $this->db->trans_start();

            $data_pago = array(
                'idplazo' => $idplazo,
                'idpaciente' => $idpaciente,
                'pagoPesos' => $pagoPesos,
                'pagoDolares' => $pagoDolares,
                'idmetodo_pago' => $idmetodo_pago,
                'tipo_cambio' => $tipo_cambio,
                'idusuario' => $this->leerToken($headerToken)->data->idusuario,
            );
            $this->db->insert('pagos_tratamientos', $data_pago);

            $tratamiento = $this->db->get_where('tratamiento_plazo', array('idplazo' => $idplazo));
            $pendiente = $tratamiento->row('pendiente');

            $nuevoPendiente = $pendiente - $pagoPesos;

            if ($nuevoPendiente <= 0) {
                $data_update = array(
                    'pendiente' => 0,
                    'estado' => 'PAGADO',
                );
            } else {
                $data_update = array(
                    'pendiente' => $nuevoPendiente,
                );

            }

            $this->db->where('idplazo', $idplazo);
            $this->db->update('tratamiento_plazo', $data_update);

            $this->db->trans_complete();
            if ($this->db->trans_status() === false) {
                $respuesta = array(
                    'mensaje' => 'Error en update.' . $this->db->last_query(),
                );
                $status = 409;
            } else {

                $respuesta = array(
                    'mensaje' => 'update correcto.',
                );
                $status = 200;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function cita_cambiar_estado_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idusuario = $this->leerToken($headerToken)->data->idusuario;
            $idagenda_cita = $this->uri->segment(3);
            $estado = $this->uri->segment(4);
            $estado_nuevo = $this->uri->segment(5);

            $data_log = array(
                'idusuario' => $idusuario,
                'idagenda_cita' => $idagenda_cita,
                'estado_anterior' => $estado,
                'estado_nuevo' => $estado_nuevo,
            );

            $this->db->trans_start();
            $this->db->where('idagenda_citas', $idagenda_cita)->update('agenda_citas', ['estado' => $estado_nuevo]);
            $this->db->insert('logs_citas', $data_log);

            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();
                $respuesta = array(
                    'mensaje' => 'Error al actualizar la cita',
                );
                $status = 401;

            } else {

                $this->db->trans_commit();
                $respuesta = array(
                    'mensaje' => 'Se ha actualizado con exito el estado de la cita',
                );
                $status = 200;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function reporte_operaciones_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $fecha1 = $this->post('fecha1');
            $fecha2 = $this->post('fecha2');

            $query = $this->db->select('fecha, monto, metodo, paciente, usuario, tipo_cambio, idmetodo')->where('fecha >=', "{$fecha1} 00:00:00")->where('fecha <=', "{$fecha2} 22:59:59")->get('view_operaciones');

            if ($query) {
                $datos = $query->result();
                $totales = [];
                $labels = [];

                if ($query->num_rows() > 0) {

                    $totales = [0, 0, 0, 0, 0];
                    $labels = ["", "", "", "", ""];

                    foreach ($datos as $dato) {
                        $x = (int) $dato->idmetodo;
                        $totales[$x] = $totales[$x] + $dato->monto;
                    }

                    $queryLabels = $this->db->get('metodos_pago')->result();
                    foreach ($queryLabels as $label) {
                        $x = (int) $label->idmetodo_pago;
                        $labels[$x] = $label->nombre;
                    }
                    array_splice($totales, 0, 1);
                    array_splice($labels, 0, 1);
                }

                $datos_grafica['labels'] = $labels;
                $datos_grafica['data'] = $totales;

                $respuesta = array(
                    'datos_grafica' => $datos_grafica,
                    'registros' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'error' => $this->db->error(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function reporte_tratamientos_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $fecha1 = $this->post('fecha1');
            $fecha2 = $this->post('fecha2');

            $query = $this->db->select('fecha, monto, metodo, paciente, usuario, tipo_cambio, idmetodo')->where('fecha >=', "{$fecha1} 00:00:00")->where('fecha <=', "{$fecha2} 22:59:59")->get('view_tratamientos');

            if ($query) {
                $datos = $query->result();
                $totales = [];
                $labels = [];
                $total_pendiente = 0;

                if ($query->num_rows() > 0) {

                    $totales = [0, 0, 0, 0, 0];
                    $labels = ["", "", "", "", ""];

                    foreach ($datos as $dato) {
                        $x = (int) $dato->idmetodo;
                        $totales[$x] = $totales[$x] + $dato->monto;
                    }

                    $queryLabels = $this->db->get('metodos_pago')->result();
                    foreach ($queryLabels as $label) {
                        $x = (int) $label->idmetodo_pago;
                        $labels[$x] = $label->nombre;
                    }
                    array_splice($totales, 0, 1);
                    array_splice($labels, 0, 1);
                }

                $plazos = $this->db->select('pendiente')->where('estado', 'PENDIENTE')->get('tratamiento_plazo')->result();
                foreach ($plazos as $plazo) {
                    $total_pendiente = $total_pendiente + $plazo->pendiente;
                }

                $datos_grafica['labels'] = $labels;
                $datos_grafica['data'] = $totales;

                $respuesta = array(
                    'datos_grafica' => $datos_grafica,
                    'registros' => $datos,
                    'total_pendiente' => $total_pendiente,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'error' => $this->db->error(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function get_tipo_citas_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $this->load->helper('paginacion');
            $pagina = $this->post('pagina');
            $por_pagina = $this->post('por_pagina');
            $filtros = $this->post('filtros');
            $filtros = (array) $filtros;
            $order = array('nombre', 'ASC');
            $campos = array('idcitas_tipo', 'nombre', 'activo');
            $respuesta = paginar_todo('citas_tipos', $pagina, $por_pagina, $campos, $filtros, $order);
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tipo_cita_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idcitas_tipo = $this->uri->segment(3);

            $query = $this->db->where('idcitas_tipo', $idcitas_tipo)->get("citas_tipos");

            if ($query && $query->num_rows() >= 1) {

                $data = $query->row();
                $respuesta = array(
                    'mensaje' => 'Cargado correctamente',
                    'registros' => $data,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tipo_cita_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $data_insert = array(
                'nombre' => strtoupper($this->post('nombre')),
                'activo' => 1,
            );

            $insercion = $this->db->insert('citas_tipos', $data_insert);

            if ($insercion) {
                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function tipo_cita_put()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $idcitas_tipo = $this->put('idcitas_tipo');
            $nombre = strtoupper($this->put('nombre'));

            $this->db->trans_begin();

            $data_update = array(
                'nombre' => $nombre,
            );

            $this->db->where('idcitas_tipo', $idcitas_tipo)->update('citas_tipos', $data_update);

            if ($this->db->trans_status() === false) {

                $this->db->trans_rollback();

                $respuesta = array(
                    'mensaje' => 'Error en insercion.',
                );
                $status = 409;

            } else {

                $this->db->trans_commit();

                $respuesta = array(
                    'mensaje' => 'Insercion correcta.',
                );
                $status = 200;
            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);
    }

    public function reporte_operaciones_tipo_post()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $fecha1 = $this->post('fecha1');
            $fecha2 = $this->post('fecha2');
            $idoperacion_tipo = $this->post('idoperacion_tipo');

            if ($idoperacion_tipo != 0) {
                $this->db->where('idoperacion_tipo', $idoperacion_tipo);
            }

            $query = $this->db->where('fecha >=', "{$fecha1} 00:00:00")->where('fecha <=', "{$fecha2} 22:59:59")->get('view_operaciones_tipos');

            if ($query) {
                $datos = $query->result();
                $totales = [];
                $labels = [];

                if ($query->num_rows() > 0) {

                    $totales = [0, 0, 0, 0];
                    $labels = ["", "", "", ""];

                    foreach ($datos as $dato) {
                        $x = (int) $dato->idoperacion_tipo;
                        $totales[$x] = $totales[$x] + (int) $dato->monto;
                    }

                    $queryLabels = $this->db->get('operaciones_tipo')->result();
                    foreach ($queryLabels as $label) {
                        $x = (int) $label->idoperacion_tipo;
                        $labels[$x] = $label->nombre;
                    }
                    array_splice($totales, 0, 1);
                    array_splice($labels, 0, 1);
                }

                $datos_grafica['labels'] = $labels;
                $datos_grafica['data'] = $totales;

                $respuesta = array(
                    'datos_grafica' => $datos_grafica,
                    'registros' => $datos,
                );
                $status = 200;
            } else {
                $respuesta = array(
                    'mensaje' => 'Error en datos',
                    'error' => $this->db->error(),
                );
                $status = 400;
            }
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function operaciones_tipos_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {

            $query = $this->db->get('operaciones_tipo');

            if ($query && $query->num_rows() > 0) {

                $datos = $query->result();
                array_unshift($datos, ['idoperacion_tipo' => 0, 'nombre' => 'Todos']);

                $respuesta = array(
                    'mensaje' => 'Acceso no autorizado',
                    'registros' => $datos,
                );
                $status = 200;

            } else {
                $respuesta = array(
                    'mensaje' => 'Error en query o ningun resultado encontrado.',
                    'error' => $this->db->error(),
                );
                $status = 500;

            }

        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }

        $this->response($respuesta, $status);

    }

    public function tratamientos_pendientes_get()
    {
        $headerToken = apache_request_headers()['Authorization'];

        if ($this->validarJWT($headerToken)) {
            $query = $this->db->get('view_tratamientos_pendiente');
            $datos = $query->result();
            $total = 0;
            foreach ($datos as $key => $value) {
                $total += $value->pendiente;
            }

            $respuesta = array(
                'mensaje' => 'Registros cargados correctamente',
                'total' => $total,
                'registros' => $datos,
            );
            $status = 200;
        } else {
            $respuesta = array(
                'mensaje' => 'Acceso no autorizado',
            );
            $status = 401;
        }
        $this->response($respuesta, $status);

    }

}
