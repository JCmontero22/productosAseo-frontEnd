import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PermisoRequest } from '../interfaces/crear-permiso-interfaces';
import { ResponseCrearPermiso } from '../interfaces/response-crear-permiso';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';
import { ResponseObtenerPermisos } from '../interfaces/response-obtener-permisos';
import { ResponseObtenerPemisoPorID } from '../interfaces/response-obtener-pemiso-por-id';

@Service()
export class PermisoService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl; // Replace with your actual API URL

    registrarPermiso(data: PermisoRequest): Observable<ResponseCrearPermiso> {
        return this.http.post<ResponseCrearPermiso>(this.apiUrl + API_ENDPOINTS.PERMISOS.CREATE, data);
    }

    obtenerPermisos(page: number = 1): Observable<ResponseObtenerPermisos> {
        return this.http.get<ResponseObtenerPermisos>(`${this.apiUrl}${API_ENDPOINTS.PERMISOS.GET_ALL}?page=${page}`);
    }

    obtenerPermisoPorId(id: number): Observable<ResponseObtenerPemisoPorID> {
        return this.http.get<ResponseObtenerPemisoPorID>(`${this.apiUrl}${API_ENDPOINTS.PERMISOS.GET_BY_ID(id)}`);
    }

    updatePermiso(id: number, data: PermisoRequest): Observable<ResponseCrearPermiso> {
        return this.http.put<ResponseCrearPermiso>(`${this.apiUrl}${API_ENDPOINTS.PERMISOS.UPDATE(id)}`, data);
    }

}
