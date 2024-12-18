import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  iniciarSesion() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe((usuario) => {
        if (usuario) {
          localStorage.setItem('userId', usuario.id);
          this.router.navigate(['/menu']);
        } else {
          alert('Credenciales incorrectas.');
        }
      });
    }
  }

  recuperarContrasena() {
    const email = this.loginForm.get('email')?.value;

    if (!email || !this.loginForm.get('email')?.valid) {
      alert('Por favor, ingrese un correo válido.');
      return;
    }

    this.authService.recuperarContrasena(email).subscribe(
      () => {
        alert('Se ha enviado un correo para recuperar la contraseña.');
      },
      (error) => {
        console.error('Error al enviar correo:', error);
        alert('No se pudo enviar el correo. Intente nuevamente más tarde.');
      }
    );
  }
}
