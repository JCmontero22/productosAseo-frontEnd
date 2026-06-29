import { Injectable, signal } from '@angular/core';
import { LoadingTypes } from '../types/loading-types';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    isLoading = signal(false);
    loadingType = signal<LoadingTypes>('spinner');

    private requests = 0;

    show(type: LoadingTypes = 'spinner'): void {
        this.requests++;
        this.loadingType.set(type);
        this.isLoading.set(true);
    }

    hide(): void {
        this.requests--;

        if (this.requests <= 0) {
            this.requests = 0;
            this.isLoading.set(false);
        }
    }

}
