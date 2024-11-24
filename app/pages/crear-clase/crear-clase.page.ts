import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/interfaces/users';
import { ClaseService } from '../../services/clase.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage {
  claseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private claseService: ClaseService,
    private router: Router
  ) {
    this.claseForm = this.fb.group({
      id: ['', Validators.required],
      asignatura: ['', Validators.required],
      horario: ['', Validators.required],
    });
  }

  crearClase() {
    if (this.claseForm.valid) {
      const nuevaClase: Clase = {
        id: this.claseForm.value.id,
        asignatura: this.claseForm.value.asignatura,
        horario: this.claseForm.value.horario,
      };

      this.claseService.crearClase(nuevaClase).subscribe(() => {
        alert('Clase creada exitosamente');
        this.router.navigate(['/clase']);
      });
    }
  }
}
