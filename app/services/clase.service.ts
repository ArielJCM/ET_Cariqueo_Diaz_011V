import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from 'src/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private apiUrl = 'http://localhost:3000/clases';

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl);
  }
  crearClase(clase: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrl, clase);
  }
  obtenerClasePorId(claseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${claseId}`);
  }
  actualizarClase(claseId: string, claseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${claseId}`, claseData);
  }
}
