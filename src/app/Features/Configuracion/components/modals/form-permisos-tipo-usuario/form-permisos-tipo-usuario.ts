import { Component, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { ModalService } from '../../../../../Core/services/modal.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-form-permisos-tipo-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-permisos-tipo-usuario.html',
  styleUrls: ['./form-permisos-tipo-usuario.css'],
})
export class FormPermisosTipoUsuario  {
  /* @ViewChild('modalPermisos') modalElement!: ElementRef;

  modalService = inject(ModalService);
  private modal: any = null;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.modalElement?.nativeElement) {
        try {
          this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
          console.log('✅ Modal bootstrap inicializado correctamente');

          // Registrar el modal en el servicio para que pueda controlarlo
          (window as any).formPermisosModal = this;
        } catch (error) {
          console.error('❌ Error al inicializar modal:', error);
        }
      } else {
        console.error('❌ Elemento del modal no encontrado');
      }
    }, 0);
  }

  abrirModal() {
    console.log('Abriendo modal FormPermisos...');
    if (this.modal) {
      try {
        this.modal.show();
        console.log('✅ Modal abierto exitosamente');
      } catch (error) {
        console.error('❌ Error al abrir modal:', error);
      }
    } else {
      console.error('❌ Modal no está inicializado');
    }
  }

  cerrarModal() {
    console.log('Cerrando modal FormPermisos...');
    try {
      if (this.modal) {
        this.modal.hide();
        console.log('✅ Modal.hide() ejecutado');
      }

      // Forzar la limpieza después de un pequeño delay
      setTimeout(() => {
        // Remover todas las instancias de backdrop
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(el => {
          console.log('Removiendo backdrop...');
          el.remove();
        });

        // Remover la clase modal-open del body
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        console.log('✅ Modal cerrado completamente');
      }, 100);
    } catch (error) {
      console.error('❌ Error al cerrar modal:', error);
    }
  } */
}
