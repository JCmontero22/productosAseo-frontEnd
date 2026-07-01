import { Component, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPermisos } from '../modals/form-permisos/form-permisos';
import { PermisoService } from '../../services/permiso.service';
import { ResponseObtenerPermisos, Meta } from '../../interfaces/response-obtener-permisos';
import { Pagination } from '../../../../Shared/components/pagination/pagination';

@Component({
  selector: 'app-tab-pane-permisos',
  standalone: true,
  imports: [CommonModule, FormPermisos, Pagination],
  templateUrl: './tab-pane-permisos.html',
  styleUrls: ['./tab-pane-permisos.css'],
})
export class TabPanePermisos implements OnInit {
    @ViewChild(FormPermisos, { static: false }) formPermisos!: FormPermisos;


    //Injectables
    private permisoService = inject(PermisoService);

    //Variables
    public permisos = signal<ResponseObtenerPermisos['data']>([]);
    public infoPagination = signal<ResponseObtenerPermisos['meta'] | null>(null);

    ngOnInit(): void {
        this.obtenerPermisos();

    }

    abrirModalPermisos(): void {
        if (this.formPermisos) {
            this.formPermisos.openCreateModal();
        } else {
            console.error('❌ Componente FormPermisos NO encontrado');
        }
    }

    public obtenerPermisos(page: number = 1): void {
        this.permisoService.obtenerPermisos(page).subscribe({
            next: (response) => {
                this.permisos.set(response.data);
                this.infoPagination.set(response.meta);
            },
            error: (error) => {
                console.error('Error al obtener permisos:', error);
            },
        });
    }

    cambiarPagina(page: number): void {
        this.obtenerPermisos(page);
        // Aquí puedes agregar la lógica para obtener los permisos de la página seleccionada
    }

    public editarPermiso(id: number): void {
        this.permisoService.obtenerPermisoPorId(id).subscribe({
            next: (response) => {
                this.formPermisos.openEditModal(response.data);
            },

            error: (error) => {
                console.error(error);
            }
        });
    }

    recargarTabla(): void {
        this.obtenerPermisos(this.infoPagination()?.current_page || 1);
    }
}
