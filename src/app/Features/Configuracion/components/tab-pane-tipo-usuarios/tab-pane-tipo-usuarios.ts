import { Component } from '@angular/core';
import { FormTipoUsuario } from '../modals/form-tipo-usuario/form-tipo-usuario';

@Component({
  selector: 'app-tab-pane-tipo-usuarios',
  imports: [FormTipoUsuario],
  templateUrl: './tab-pane-tipo-usuarios.html',
  styleUrls: ['./tab-pane-tipo-usuarios.css'],
  standalone: true
})
export class TabPaneTipoUsuarios {}
