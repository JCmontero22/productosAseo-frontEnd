import { AfterViewInit, Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../../services/permiso.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../../Core/services/loading.service';
import { AlerService } from '../../../../../Core/services/aler.service';
import { Permiso, ResponseObtenerPermisos } from '../../../interfaces/response-obtener-permisos';
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
    public mode = signal<'create' | 'edit'>('create');
    public permisoActual = signal<Permiso | null>(null);
    public guardarCambios = output<void>();


    //formulario
    public permisoForm = this.fb.nonNullable.group({
        nombre_permiso: ['', Validators.required],
        descripcion_permiso: ['', Validators.required],
        slug_permiso: ['', Validators.required],
    });

    private mostrarModal(): void {

        if (!this.modal) {
            console.error('❌ Modal no inicializado');
            return;
        }

        this.modal.show();
    }

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

    openCreateModal() {
        this.mode.set('create');

        this.permisoActual.set(null);

        this.permisoForm.reset();

        this.mostrarModal();
    }

    openEditModal(permiso: Permiso) {
        this.mode.set('edit');

        this.permisoActual.set(permiso);

        this.permisoForm.patchValue({

            nombre_permiso: permiso.nombre,

            descripcion_permiso: permiso.descripcion,

            slug_permiso: permiso.slug

        });

        this.mostrarModal();
    }

    cerrarModal() {
        try {
            if (this.modal) {
                this.modal.hide();
                this.permisoForm.reset();
                this.permisoActual.set(null);
                this.mode.set('create');
            }
        } catch (error) {
            console.error('Error al cerrar modal:', error);
        }
    }

    onSubmit() {
        if (!this.validarFormulario()) {
            return;
        }

        if (this.mode() === 'edit') {
            // Aquí puedes agregar la lógica para actualizar el permiso existente
            this.actualizarPermiso(this.permisoActual()?.id!);
        } else {
            // Aquí puedes agregar la lógica para crear un nuevo permiso
            this.registrarPermiso();
        }
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
                this.permisoForm.reset();
                this.guardarCambios.emit();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al registrar permiso:', error);
            },
            complete: () => {
                this.loadingService.hide();
            }
        });
    }

    private actualizarPermiso(id: number): void {
        const permisoData = this.permisoForm.getRawValue();
        this.permisoService.updatePermiso(id, permisoData).subscribe({
            next: (response) => {
                this.alertService.success(response.titulo, response.mensaje);
                this.permisoForm.reset();
                this.guardarCambios.emit();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al actualizar permiso:', error);
            }
        });
    }
}
