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
  clases: Clase[] = []; // Lista que contendrá las clases obtenidas del servicio

  constructor(private claseService: ClaseService, private router: Router) {}

  ngOnInit() {
    this.actualizarClases(); // Llamamos a la función para cargar las clases cuando se inicializa la página
  }

  // Función para actualizar la lista de clases desde el servicio
  actualizarClases() {
    this.claseService.obtenerClases().subscribe((clases: Clase[]) => {
      this.clases = clases; // Asignamos las clases obtenidas a la propiedad 'clases'
    });
  }

  // Función para navegar a la página de asistencia
  gestionarAsistencia(claseId: string) {
    this.router.navigate([`/asistencia`, claseId]);
  }

  // Función para navegar a la página de justificaciones
  gestionarJustificaciones(claseId: string) {
    this.router.navigate([`/justificaciones`, claseId]);
  }

  // Función para navegar a la cámara (para escanear el QR)
  abrirCamara(claseId: string) {
    this.router.navigate([`/camara`, claseId]);
  }

  // Función para navegar a la página de creación de clase
  irACrearClase() {
    this.router.navigate(['/crear-clase']);
  }
}
