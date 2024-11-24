import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from '../../services/clase.service';

@Component({
  selector: 'app-justificaciones',
  templateUrl: './justificaciones.page.html',
  styleUrls: ['./justificaciones.page.scss'],
})
export class JustificacionesPage implements OnInit {
  claseId: string = '';
  justificaciones: any[] = [];

  constructor(private route: ActivatedRoute, private claseService: ClaseService) {}

  ngOnInit() {
    this.claseId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerJustificaciones();
  }
  obtenerJustificaciones() {
    this.claseService.obtenerClasePorId(this.claseId).subscribe((clase: any) => {
      if (clase && clase.justificaciones) {
        this.justificaciones = clase.justificaciones;
        console.log(this.justificaciones);
      }
    });
  }
}
