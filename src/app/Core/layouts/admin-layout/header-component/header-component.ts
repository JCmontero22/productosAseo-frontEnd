import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LoginService } from '../../../../Features/Auth/services/auth.service';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css'],
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  private authService = inject(LoginService);

  logout(): void {
      this.authService.logout();
  }

}
