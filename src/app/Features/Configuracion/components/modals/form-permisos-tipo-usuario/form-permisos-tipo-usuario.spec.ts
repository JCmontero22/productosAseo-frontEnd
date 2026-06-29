import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPermisosTipoUsuario } from './form-permisos-tipo-usuario';

describe('FormPermisosTipoUsuario', () => {
  let component: FormPermisosTipoUsuario;
  let fixture: ComponentFixture<FormPermisosTipoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPermisosTipoUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPermisosTipoUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
