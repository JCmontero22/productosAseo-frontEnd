import { Component, computed, input, output } from '@angular/core';
import { Meta } from '../../../Features/Configuracion/interfaces/response-obtener-permisos';

@Component({
  selector: 'app-pagination',
  imports: [],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {

    pagination = input.required<Meta>();
    pageChange = output<number>();

    pages = computed(() => {
        return Array.from({ length: this.pagination().last_page }, (_, i) => i + 1);
    });

    previousPage() {
        if (this.pagination().current_page > 1) {
            this.pageChange.emit(this.pagination().current_page - 1);
        }
    }

    nextPage() {
        if (this.pagination().current_page < this.pagination().last_page) {
            this.pageChange.emit(this.pagination().current_page + 1);
        }
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.pagination().last_page) {
            this.pageChange.emit(page);
        }
    }
}
