import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotFoundComponent } from './authentication/404/not-found.component';
import { LoginGuard, RoleGuardService as RoleGuard } from './servicios/servicio.index';

export const Approutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            {
                path: 'starter',
                canActivate: [LoginGuard],
                loadChildren: './starter/starter.module#StarterModule'
            },
            {
                path: 'usuarios',
                canActivate: [RoleGuard],
                loadChildren: './pages/usuarios/usuarios.module#UsuariosModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'medicamentos',
                canActivate: [RoleGuard],
                loadChildren: './pages/medicamentos/medicamentos.module#MedicamentosModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'calendario',
                canActivate: [RoleGuard],
                loadChildren: './pages/calendario/calendario.module#CalendarioModule',
                data: {
                    expectedRole: ['1', '2', '3']
                }
            },
            {
                path: 'pacientes',
                canActivate: [RoleGuard],
                loadChildren: './pages/pacientes/pacientes.module#PacientesModule',
                data: {
                    expectedRole: ['3', '1', '2']
                }
            },
            {
                path: 'historial',
                canActivate: [RoleGuard],
                loadChildren: './pages/historial/historial.module#HistorialModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'graficas_barras',
                canActivate: [RoleGuard],
                loadChildren: './pages/graficas/graficas.module#GraficasModule',
                data: {
                    expectedRole: ['3']
                }
            },
            {
                path: 'salidas_inventario',
                canActivate: [RoleGuard],
                loadChildren: './pages/salidas/salidas.module#SalidasModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'entrada_inventario',
                canActivate: [RoleGuard],
                loadChildren: './pages/entradas/entradas.module#EntradasModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'component',
                canActivate: [RoleGuard],
                loadChildren: './component/component.module#ComponentsModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'servicios',
                canActivate: [RoleGuard],
                loadChildren: './pages/servicios/servicios.module#ServiciosModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'tratamientos',
                canActivate: [RoleGuard],
                loadChildren: './pages/tratamientos/tratamientos.module#TratamientosModule',
                data: {
                    expectedRole: ['3', '1']
                }
            },
            {
                path: 'caja',
                canActivate: [RoleGuard],
                loadChildren: './pages/caja/caja.module#CajaModule',
                data: {
                    expectedRole: ['1', '2', '3']
                }
            },
            {
                path: 'tipo_cambio',
                canActivate: [RoleGuard],
                loadChildren: './pages/tipo-cambio/tipo-cambio.module#TipoCambioModule',
                data: {
                    expectedRole: ['1', '2', '3']
                }
            },
            {
                path: 'reportes',
                canActivate: [RoleGuard],
                loadChildren: './pages/reportes/reportes.module#ReportesModule',
                data: {
                    expectedRole: ['1', '3']
                }
            },
            {
                path: 'tipo_citas',
                canActivate: [RoleGuard],
                loadChildren: './pages/tipo-citas/tipo-citas.module#TipoCitasModule',
                data: {
                    expectedRole: ['1', '3']
                }
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];


