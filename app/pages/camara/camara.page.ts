import { Component, OnInit, ViewChild } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ClaseService } from '../../services/clase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  @ViewChild('qrScannerContainer', { static: false }) qrScannerContainer: any;

  claseId: string = '';
  mensaje: string = '';
  error: string = '';

  constructor(
    private qrScanner: QRScanner,
    private claseService: ClaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.claseId = this.route.snapshot.paramMap.get('id')!;
  }
  iniciarEscaneo() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        this.qrScanner.scan().subscribe((text: string) => {
          console.log('QR Code:', text);
          this.procesarQR(text);
        });
      } else if (status.denied) {
        this.error = 'Acceso a la cámara denegado. Necesitas habilitarlo en los ajustes del dispositivo.';
      } else {
        this.error = 'No se pudo acceder a la cámara';
      }
    }).catch((e) => {
      this.error = 'Hubo un error al preparar el escáner: ' + e;
    });
  }
  procesarQR(qrData: string) {
    try {
      const datos = JSON.parse(qrData);
      if (datos.id && datos.nombre && datos.correo) {
        this.agregarAsistente(datos);
      } else {
        this.error = 'El código QR no contiene la información requerida.';
      }
    } catch (e) {
      this.error = 'Error al procesar el código QR.';
    }
  }
  agregarAsistente(datos: any) {
    this.claseService.obtenerClasePorId(this.claseId).subscribe((clase: any) => {
      if (clase) {
        const claseActualizada = {
          ...clase,
          asistentes: [...clase.asistentes, datos]
        };
        this.claseService.actualizarClase(this.claseId, claseActualizada).subscribe(() => {
          this.mensaje = 'Asistente agregado correctamente';
        });
      } else {
        this.error = 'Clase no encontrada.';
      }
    });
  }
}
