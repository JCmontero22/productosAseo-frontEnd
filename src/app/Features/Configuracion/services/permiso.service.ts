import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CrearPermisoInterfaces } from '../interfaces/crear-permiso-interfaces';
import { ResponseCrearPermiso } from '../interfaces/response-crear-permiso';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';
import { ResponseObtenerPermisos } from '../interfaces/response-obtener-permisos';

@Service()
export class PermisoService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl; // Replace with your actual API URL

    registrarPermiso(data: CrearPermisoInterfaces): Observable<ResponseCrearPermiso> {
        return this.http.post<ResponseCrearPermiso>(this.apiUrl + API_ENDPOINTS.PERMISOS.CREATE, data);
    }

    obtenerPermisos(page: number = 1): Observable<ResponseObtenerPermisos> {
        return this.http.get<ResponseObtenerPermisos>(`${this.apiUrl}${API_ENDPOINTS.PERMISOS.GET_ALL}?page=${page}`);
    }
}
