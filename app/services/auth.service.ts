import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNuevo, Users } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:UserNuevo): Observable<UserNuevo>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.httpclient.get(`${this.apiUrl}/usuarios/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.httpclient.put(`${this.apiUrl}/usuarios/${userId}`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.get<any[]>(`${this.apiUrl}/usuarios`).pipe(
      map((usuarios: any[]) => {
        return usuarios.find(
          (user) => user.email === email && user.password === password
        );
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('userId');
  }
  recuperarContrasena(email: string): Observable<any> {
    return this.httpclient.post<any>(`${this.apiUrl}/recuperar-contrasena`, { email });
  }
}
