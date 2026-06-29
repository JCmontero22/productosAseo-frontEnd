import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../Shared/components/page-header-component/page-header-component';
import { TabPanePermisos } from '../../components/tab-pane-permisos/tab-pane-permisos';
import { TabPaneTipoUsuarios } from '../../components/tab-pane-tipo-usuarios/tab-pane-tipo-usuarios';
import { TabPaneAsignarPermisos } from "../../components/tab-pane-asignar-permisos/tab-pane-asignar-permisos";

@Component({
  selector: 'app-seguridad',
  imports: [PageHeaderComponent, CommonModule, TabPanePermisos, TabPaneTipoUsuarios, TabPaneAsignarPermisos],
  templateUrl: './seguridad.html',
  styleUrls: ['./seguridad.css'],
})
export class Seguridad {}
