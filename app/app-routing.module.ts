import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.page';
import { MenuInicioPage } from './pages/menu-inicio/menu-inicio.page';
import { RegistroPage } from './pages/registro/registro.page';
import { PerfilPage } from './pages/perfil/perfil.page';
import { AuthGuard } from './services/auth.guard';
import { AsistenciaPage } from './pages/asistencia/asistencia.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu-inicio',
    pathMatch: 'full'
  },
  {
    path: 'menu-inicio',
    loadChildren: () => import('./pages/menu-inicio/menu-inicio.module').then( m => m.MenuInicioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'asistencia/:id',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'crear-clase',
    loadChildren: () => import('./pages/crear-clase/crear-clase.module').then( m => m.CrearClasePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'justificaciones/:id',
    loadChildren: () => import('./pages/justificaciones/justificaciones.module').then( m => m.JustificacionesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'camara/:id',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule), canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
