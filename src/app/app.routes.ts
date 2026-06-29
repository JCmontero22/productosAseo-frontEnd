import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth-guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    // Layout de autenticación
    {
        path: '',
        loadComponent: () =>
            import('./Core/layouts/auth-layout/auth-layout')
            .then(m => m.AuthLayout),

        children: [

            {
                path: 'login',
                loadComponent: () =>
                    import('./Features/Auth/pages/auth/auth')
                    .then(m => m.Auth)
            }

        ]

    },

    // Layout administrativo
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./Core/layouts/admin-layout/admin-layout')
            .then(m => m.AdminLayout),

        children: [

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./Features/Dashboard/pages/dashboard/dashboard')
                    .then(m => m.Dashboard)
            },

            {
                path: 'configuraciones',
                loadChildren: () =>
                    import('./Features/Configuracion/router')
                    .then(m => m.routes)
            }

        ]

    },

    {
        path: '**',
        redirectTo: 'login'
    }

];
