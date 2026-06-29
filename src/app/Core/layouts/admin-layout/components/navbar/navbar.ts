import { Component, EventEmitter, Input, Output, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnDestroy {

  router = inject(Router);
  @Input() collapsed = false;
  @Output() closeSidebar = new EventEmitter<void>();

  submenuProductsOpen = false;
  submenuSettingsOpen = false;

  private sub: Subscription | undefined;

  constructor() {
    // Mantener submenús abiertos según la ruta activa
    this.sub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e: any) => {
      const url = e.urlAfterRedirects || e.url || '';
      this.setActiveSubmenu(url);
    });

    // Estado inicial
    this.setActiveSubmenu(this.router.url || '');
  }

  onNavLinkClick() {
    // si es móvil, cerrar sidebar automáticamente
    try {
      if (window.innerWidth < 768) {
        this.closeSidebar.emit();
      }
    } catch (err) {
      // Entornos sin DOM, como SSR, pueden ignorar este cierre automático.
    }
  }

  setActiveSubmenu(url: string) {
    this.submenuProductsOpen = url.includes('/products');
    this.submenuSettingsOpen = url.includes('/configuraciones') || url.includes('/admin/configuraciones');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
