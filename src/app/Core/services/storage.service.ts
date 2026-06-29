import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DataSesionInterface } from '../interfaces/data-sesion-interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private platformId = inject(PLATFORM_ID);
    private readonly SESSION_KEY = 'session';
    private readonly TOKEN_KEY = 'token';

    private get storage(): Storage | null {
        return isPlatformBrowser(this.platformId) ? localStorage : null;
    }

    saveSession(data: DataSesionInterface): void {
        this.storage?.setItem(this.SESSION_KEY, JSON.stringify(data));
        this.storage?.setItem(this.TOKEN_KEY, data.token);
    }

    getSession(): DataSesionInterface | null {
        const sessionData = this.storage?.getItem(this.SESSION_KEY);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    getToken(): string | null {
        const session = this.getSession();
        return session ? session.token : null;
    }

    clearSession(): void {
        this.storage?.removeItem(this.SESSION_KEY);
        this.storage?.removeItem(this.TOKEN_KEY);
    }

}
