import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-page-header-component',
  imports: [CommonModule],
  templateUrl: './page-header-component.html',
  styleUrls: ['./page-header-component.css'],
  standalone: true
})
export class PageHeaderComponent {

  // Títulos
  title = input.required<string>();
  subtitle = input.required<string>();

  // Breadcrumb
  breadcrumb = input<string[]>([]);

  // Buscador
  showSearch = input<boolean>(false);
  searchPlaceholder = input<string>('Buscar...');

  // Filtro
  showFilter = input<boolean>(false);
  filterPlaceholder = input<string>('Filtrar por...');
  filterOptions = input<FilterOption[]>([]);
  filterLabel = input<string>('Filtro');

  // Botón Principal
  showBtnPrincipal = input<boolean>(false);
  btnPrincipalText = input<string>('Nuevo');
  primaryBtnIcon = input<string>('fa-plus');
  modalTarget = input<string>('');

  // Eventos
  search = output<string>();
  filter = output<string>();
  primaryBtnClick = output<void>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }

  onFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filter.emit(value);
  }

  onPrimaryBtnClick() {
    this.primaryBtnClick.emit();
  }

}
