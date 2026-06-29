import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetLoginInterfaces } from '../interfaces/get-login-interfaces';
import { AuthCredentialService } from './auth-credential.service';
import { SessionService } from '../../../Core/services/session.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private authCredentialService = inject(AuthCredentialService);
    private sessionService = inject(SessionService);

    login(usuario: string, password: string): Observable<GetLoginInterfaces> {
        return this.authCredentialService.login(usuario, password) as Observable<GetLoginInterfaces>;
    }

    logout(): void {
        this.authCredentialService.logout();
    }

    isAuthenticated(): boolean {
        return this.sessionService.isAuthenticated();
    }

    getToken(): string | null {
        return this.sessionService.getToken();
    }

    getUserData(): any {
        return this.sessionService.getSession();
    }

    getUserId(): number | null {
        return this.sessionService.getUserId();
    }

    getUserTypeId(): number | null {
        return this.sessionService.getUserTypeId();
    }

    getUserSedeId(): number | null {
        return this.sessionService.getUserSedeId();
    }
}
