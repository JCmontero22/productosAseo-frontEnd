import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../Core/services/loading.service';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
    styleUrls: ['./auth.css'],
})
export class Auth {

    private loginService = inject(LoginService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private loadingService = inject(LoadingService);

    public loginForm = this.fb.nonNullable.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
    });



    onSubmit(): void {

        if (!this.validarFormulario()) {
            return;
        }
        this.autenticarUsuario();
    }

    private validarFormulario(): boolean {

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return false;
        }
        return true;
    }

    private autenticarUsuario(): void {

        const { usuario, password } = this.loginForm.getRawValue();


        this.loadingService.show('text');

        setTimeout(() => {

            this.loginService.login(usuario, password).pipe(finalize(() => this.loadingService.hide())).subscribe({
                next: () => {
                    this.redireccionarDashboard();
                },
            });
        }, 2000);
    }

    private redireccionarDashboard(): void {

        this.router.navigate([
            '/admin'
        ]);

    }

}
