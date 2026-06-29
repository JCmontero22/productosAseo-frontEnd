import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoUsuario } from './form-tipo-usuario';

describe('FormTipoUsuario', () => {
  let component: FormTipoUsuario;
  let fixture: ComponentFixture<FormTipoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTipoUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTipoUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
