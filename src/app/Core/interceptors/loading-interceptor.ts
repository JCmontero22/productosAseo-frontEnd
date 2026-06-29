import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';


export const loadingInterceptor: HttpInterceptorFn = (request, next) => {

    const loadingService = inject(LoadingService);
    const apiPath = new URL(environment.apiUrl).pathname.replace(/\/$/, '');
    const requestPath = new URL(request.url, environment.apiUrl).pathname.replace(/\/$/, '');

    const excludedPaths = [
        `${apiPath}/refresh-token`,
        `${apiPath}/notifications`,
        `${apiPath}/validate-token`,
        `${apiPath}/login`
    ];

    // Si la URL de la solicitud coincide con alguna de las URLs excluidas, no mostrar el loading
    if (excludedPaths.includes(requestPath)) {
        return next(request);
    }

    loadingService.show('spinner');

    return next(request).pipe(
        finalize(() => loadingService.hide())
    );


};
