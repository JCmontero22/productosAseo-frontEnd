import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HeaderComponent } from "./header-component/header-component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, HeaderComponent],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayout implements OnDestroy {
  sidebarCollapsed = false;

  constructor() {
    try {
      this.sidebarCollapsed = window.innerWidth < 768;
    } catch (err) {
      this.sidebarCollapsed = false;
    }

    this.syncBodyClass();
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.syncBodyClass();
  }

  closeSidebar() {
    this.sidebarCollapsed = true;
    this.syncBodyClass();
  }

  private syncBodyClass() {
    try {
      if (this.sidebarCollapsed) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    } catch (err) {
      // Entornos sin DOM, como SSR, pueden ignorar esta sincronizacion.
    }
  }

  ngOnDestroy(): void {
    try {
      document.body.classList.remove('sidebar-collapsed');
    } catch (err) {
      // Entornos sin DOM, como SSR, pueden ignorar esta sincronizacion.
    }
  }
}
