import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPermisos } from '../modals/form-permisos/form-permisos';
import { PermisoService } from '../../services/permiso.service';
import { ResponseObtenerPermisos } from '../../interfaces/response-obtener-permisos';
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
    public infoPagination = signal<ResponseObtenerPermisos['infoPagination'] | null>(null);

    ngOnInit(): void {
        this.obtenerPermisos();
    }

    abrirModalPermisos(): void {
        if (this.formPermisos) {
            this.formPermisos.abrirModal();
        } else {
            console.error('❌ Componente FormPermisos NO encontrado');
        }
    }

    public obtenerPermisos(page: number = 1): void {
        this.permisoService.obtenerPermisos(page).subscribe({
            next: (response) => {
                this.permisos.set(response.data);
                this.infoPagination.set(response.infoPagination);
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
}
