import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ModalService } from '../../../../../Core/services/modal.service';
declare var bootstrap: any;
@Component({
  selector: 'app-form-tipo-usuario',
  standalone: true,
  imports: [],
  templateUrl: './form-tipo-usuario.html',
  styleUrls: ['./form-tipo-usuario.css'],
})
export class FormTipoUsuario implements AfterViewInit {
    @ViewChild('crearTiposUsuario') modalElement!: ElementRef;
    modalService = inject(ModalService);
    private modal: any = null;

    ngAfterViewInit() {
        if (this.modalElement) {
            try {
                this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
                (window as any).formTipoUsuarioModal = this;
            } catch (error) {
                console.error('Error al inicializar modal:', error);
            }
        } else {
            console.error('❌ Elemento del modal no encontrado');
        }
    }

    abrirModal() {
        if (this.modal) {
            try {
                this.modal.show();
            } catch (error) {
                console.error('Error al abrir modal:', error);
            }
        } else {
            console.error('❌ Modal no está inicializado');
        }
    }

    cerrarModal() {
        try {
            if (this.modal) {
                this.modal.hide();
            }
        } catch (error) {
            console.error('Error al cerrar modal:', error);
        }
    }
}
