import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { Clase } from 'src/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  clases: Clase[] = [];

  constructor(private claseService: ClaseService, private router: Router) {}

  ngOnInit() {
    this.actualizarClases();
  }
  actualizarClases() {
    this.claseService.obtenerClases().subscribe((clases: Clase[]) => {
      this.clases = clases;
    });
  }
  gestionarAsistencia(claseId: string) {
    this.router.navigate([`/asistencia`, claseId]);
  }
  gestionarJustificaciones(claseId: string) {
    this.router.navigate([`/justificaciones`, claseId]);
  }
  abrirCamara(claseId: string) {
    this.router.navigate([`/camara`, claseId]);
  }
  irACrearClase() {
    this.router.navigate(['/crear-clase']);
  }
}
