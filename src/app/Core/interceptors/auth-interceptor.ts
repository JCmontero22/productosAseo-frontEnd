import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

    const storageService = inject(StorageService);

    // Saltar autenticación en login
    if (request.url.includes('/login')) {
        return next(request);
    }

    const token = storageService.getToken();

    if (!token) {
        return next(request);
    }

    // Clonar request y agregar header de autorización
    const authRequest = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authRequest);
};
