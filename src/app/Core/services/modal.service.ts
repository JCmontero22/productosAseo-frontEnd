import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    isModalOpen = signal<string | null>(null);

    openModal(modalId: string) {
        this.isModalOpen.set(modalId);
    }

    closeModal() {
        this.isModalOpen.set(null);
    }

}
