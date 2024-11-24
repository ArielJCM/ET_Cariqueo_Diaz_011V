import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilForm: FormGroup;
  imagenPerfil: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.perfilForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.cargarUsuario('090f');
  }
  cargarUsuario(userId: string) {
    this.authService.getUserById(userId).subscribe((usuario) => {
      this.perfilForm.patchValue({
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
      });
      this.imagenPerfil = usuario.imagen || 'assets/default-profile.png';
    });
  }
  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPerfil = e.target.result;
      };
      reader.readAsDataURL(archivo);
    }
  }
  guardarPerfil() {
    if (this.perfilForm.valid) {
      const datosPerfil = { ...this.perfilForm.value };
      if (this.imagenPerfil) {
        datosPerfil.imagen = this.imagenPerfil;
      }
      this.authService.updateUser('090f', datosPerfil).subscribe(() => {
        alert('Perfil actualizado');
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
