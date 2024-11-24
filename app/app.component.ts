import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

interface Opciones{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Opciones[]=[
    {
      icon:'call-outline',
      name:'Menu',
      redirecTo:'/menu'
    },
    {
      icon:'call-outline',
      name:'Perfil',
      redirecTo:'/perfil'
    },
    {
      icon:'call-outline',
      name:'clases',
      redirecTo:'/clases'
    }
  ]
  
  isMenuDisabled = false; 
  
  constructor(private router: Router,private authService: AuthService) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const navigationEndEvent = event as NavigationEnd;
        if (
          navigationEndEvent.urlAfterRedirects === '/inicio' ||
          navigationEndEvent.urlAfterRedirects === '/menu-inicio' ||
          navigationEndEvent.urlAfterRedirects === '/registro'
        ) {
          this.isMenuDisabled = true;
        } else {
          this.isMenuDisabled = false;
        }
      });
    }

  cerrarSesion() {
    this.authService.logout();
    localStorage.removeItem('userId');

    this.router.navigate(['/menu-inicio']);
  }
}
