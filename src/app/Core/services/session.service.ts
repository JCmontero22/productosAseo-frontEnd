import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DataSesionInterface, User } from '../interfaces/data-sesion-interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private storageService = inject(StorageService);

    saveSession(data: DataSesionInterface): void {
        this.storageService.saveSession(data);
    }

    getSession(): DataSesionInterface | null {
        return this.storageService.getSession();
    }

    getToken(): string | null {
        return this.storageService.getToken();
    }

    getUserData(): User | null {
        const session = this.getSession();
        return session?.user ?? null;
    }

    getUserId(): number | null {
        return this.getUserData()?.id_usuario ?? null;
    }

    getUserTypeId(): number | null {
        return this.getUserData()?.id_tipo_usuario ?? null;
    }

    getUserSedeId(): number | null {
        return this.getUserData()?.id_sede ?? null;
    }

    clearSession(): void {
        this.storageService.clearSession();
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
