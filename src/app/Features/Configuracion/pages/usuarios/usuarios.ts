import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, FilterOption } from '../../../../Shared/components/page-header-component/page-header-component';
import { FormPermisos } from '../../components/modals/form-permisos/form-permisos';

declare var bootstrap: any;

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  activo: boolean;
  telefono?: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [PageHeaderComponent, CommonModule, ReactiveFormsModule, FormPermisos],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class Usuarios implements OnInit, AfterViewInit {
  @ViewChild('modalCrearUsuario') modalElement!: ElementRef;
  @ViewChild(FormPermisos, { static: false }) formPermisos!: FormPermisos;

  private fb = inject(FormBuilder);
  private modal: any = null;

  // Datos
  usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan.garcia@ecoclean.com',
      rol: 'admin',
      estado: 'activo',
      fechaCreacion: '15/06/2024',
      activo: true,
      telefono: '+34 600 123 456'
    },
    {
      id: 2,
      nombre: 'María López',
      email: 'maria.lopez@ecoclean.com',
      rol: 'supervisor',
      estado: 'activo',
      fechaCreacion: '10/06/2024',
      activo: true,
      telefono: '+34 600 234 567'
    },
    {
      id: 3,
      nombre: 'Pedro Martínez',
      email: 'pedro.martinez@ecoclean.com',
      rol: 'operario',
      estado: 'inactivo',
      fechaCreacion: '05/06/2024',
      activo: false,
      telefono: '+34 600 345 678'
    }
  ];

  usuariosFiltrados: Usuario[] = [...this.usuarios];
  terminoBusqueda: string = '';
  filtroRol: string = '';

  // Opciones de filtro
  rolesOptions: FilterOption[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Operario', value: 'operario' }
  ];

  // Formulario reactivo
  usuarioForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    telefono: [''],
    activo: [true]
  }, {
    validators: this.passwordMatchValidator
  });

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.inicializarModal();
  }

  private inicializarModal() {
    if (this.modalElement?.nativeElement) {
      this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    }
  }

  abrirModal() {
    this.usuarioForm.reset({ activo: true, rol: '' });
    this.modal?.show();
  }

  abrirPermisosModal() {
    if (this.formPermisos) {
      this.formPermisos.abrirModal();
    } else {
      console.error('Componente FormPermisos no encontrado');
    }
  }

  cerrarModal() {
    this.modal?.hide();
    this.usuarioForm.reset();
  }

  onBusqueda(termino: string) {
    this.terminoBusqueda = termino.toLowerCase();
    this.aplicarFiltros();
  }

  onFiltroRol(rol: string) {
    this.filtroRol = rol;
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const coincideBusqueda =
        usuario.nombre.toLowerCase().includes(this.terminoBusqueda) ||
        usuario.email.toLowerCase().includes(this.terminoBusqueda);

      const coincideFiltro = !this.filtroRol || usuario.rol === this.filtroRol;

      return coincideBusqueda && coincideFiltro;
    });
  }

  onSubmit() {
    if (!this.usuarioForm.valid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const formValue = this.usuarioForm.getRawValue();

    const nuevoUsuario: Usuario = {
      id: Math.max(...this.usuarios.map(u => u.id), 0) + 1,
      nombre: formValue.nombre,
      email: formValue.email,
      rol: formValue.rol,
      estado: formValue.activo ? 'activo' : 'inactivo',
      fechaCreacion: new Date().toLocaleDateString('es-ES'),
      activo: formValue.activo,
      telefono: formValue.telefono || undefined
    };

    this.usuarios.push(nuevoUsuario);
    this.aplicarFiltros();
    this.cerrarModal();
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.aplicarFiltros();
    }
  }

  private passwordMatchValidator(form: any) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  getEstadoBadgeClass(estado: string): string {
    return estado === 'activo' ? 'status-active' : 'status-inactive';
  }

  getRolBadgeClass(rol: string): string {
    const classes: { [key: string]: string } = {
      admin: 'badge-admin',
      supervisor: 'badge-supervisor',
      operario: 'badge-operario'
    };
    return classes[rol] || 'badge-default';
  }

  getRolTexto(rol: string): string {
    const textos: { [key: string]: string } = {
      admin: 'Administrador',
      supervisor: 'Supervisor',
      operario: 'Operario'
    };
    return textos[rol] || rol;
  }
}
