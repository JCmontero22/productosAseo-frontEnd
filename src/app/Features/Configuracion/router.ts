import { Routes } from '@angular/router';


export const routes: Routes = [

    {path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios)},
    {path: 'seguridad', loadComponent: () => import('./pages/seguridad/seguridad').then(m => m.Seguridad)},
];
