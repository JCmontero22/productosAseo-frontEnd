import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AlerService } from '../services/aler.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const alertService = inject(AlerService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const response = error.error;

            if (response?.titulo && response?.mensaje && response?.icono) {
                if (response.icono === 'error') {
                    alertService.error(response.titulo, response.mensaje);
                } else if (response.icono === 'warning') {
                    alertService.warning(response.titulo, response.mensaje);
                } else if (response.icono === 'info') {
                    alertService.info(response.titulo, response.mensaje);
                }
            }else{
                alertService.error('Error', 'Ocurrió un error inesperado');
            }

            return throwError(() => error);

        })
    );

};
