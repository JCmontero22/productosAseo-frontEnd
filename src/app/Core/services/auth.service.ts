import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { DataSesionInterface } from '../interfaces/data-sesion-interface';

export interface LoginResponse {
    data: DataSesionInterface;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    login(usuario: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${environment.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
            { usuario, password }
        );
    }
}
