import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../../services/permiso.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../Core/services/loading.service';
import { AlerService } from '../../../../../Core/services/aler.service';
import { ResponseObtenerPermisos } from '../../../interfaces/response-obtener-permisos';
declare var bootstrap: any;
@Component({
    selector: 'app-form-permisos',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-permisos.html',
    styleUrls: ['./form-permisos.css'],
})
export class FormPermisos implements AfterViewInit {
    @ViewChild('crearPermisos') modalElement!: ElementRef;


    //injectables
    private permisoService = inject(PermisoService);
    private fb = inject(FormBuilder);
    private loadingService = inject(LoadingService);
    private alertService = inject(AlerService);

    //variables
    private modal: any = null;
    

    //formulario
    public permisoForm = this.fb.nonNullable.group({
        nombre_permiso: ['', Validators.required],
        descripcion_permiso: ['', Validators.required],
        slug_permiso: ['', Validators.required],
    });

    ngAfterViewInit() {
        if (this.modalElement?.nativeElement) {
              try {
                  this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
              } catch (error) {
                  console.error('Error al inicializar modal:', error);
              }
        }else{
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

    onSubmit() {
        alert('Formulario enviado');
        if (!this.validarFormulario()) {
            return;
        }
        this.registrarPermiso();
    }

    private validarFormulario(): boolean {
        if (this.permisoForm.invalid) {
            this.permisoForm.markAllAsTouched();
            return false;
        }
        return true;
    }

    private registrarPermiso() {

        const permisoData = this.permisoForm.getRawValue();

        this.loadingService.show('spinner');

        this.permisoService.registrarPermiso(permisoData).subscribe({
            next: (response) => {
                this.alertService.success(response.titulo, response.mensaje);
                this.cerrarModal();
                this.permisoForm.reset();
            },
            error: (error) => {
                console.error('Error al registrar permiso:', error);
            },
            complete: () => {
                this.loadingService.hide();
            }
        });
    }
}
