import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService, LoginResponse } from '../../../Core/services/auth.service';
import { SessionService } from '../../../Core/services/session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthCredentialService {
    private authService = inject(AuthService);
    private sessionService = inject(SessionService);
    private router = inject(Router);

    login(usuario: string, password: string): Observable<LoginResponse> {
        return this.authService.login(usuario, password).pipe(
            tap(response => {
                this.sessionService.saveSession(response.data);
            })
        );
    }

    logout(): void {
        this.sessionService.clearSession();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this.sessionService.isAuthenticated();
    }
}
