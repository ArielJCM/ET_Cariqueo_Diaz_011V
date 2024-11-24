import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from '../../services/clase.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  claseId: string = '';
  asistentes: any[] = [];

  constructor(private route: ActivatedRoute, private claseService: ClaseService) {}

  ngOnInit() {
    this.claseId = this.route.snapshot.paramMap.get('id')!;
    this.obtenerAsistentes();
  }

  obtenerAsistentes() {
    this.claseService.obtenerClasePorId(this.claseId).subscribe((clase: any) => {
      if (clase && clase.asistentes) {
        this.asistentes = clase.asistentes;
        console.log(this.asistentes);
      }
    });
  }
}
