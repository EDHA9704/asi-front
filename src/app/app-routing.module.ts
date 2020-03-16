import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './_modulos/home';
import { AdminComponent } from './_modulos/admin';
import { LoginComponent } from './_modulos/autenticacion';
import { AuthGuard,AutenticacionGuard,AdminGuard} from './_core';
import {NotFoundComponent} from './_shared/components/not-found/not-found.component'
import { Role } from './_models';
import { LayoutComponent } from './_modulos/layout/layout.component';
import { PerfilMascotaComponent } from 'src/app/_modulos/perfiles/components/perfil-mascota/perfil-mascota.component';
import { PerfilEmergenciaComponent } from 'src/app/_modulos/perfiles/components/perfil-emergencia/perfil-emergencia.component';
import { PerfilDonacionComponent } from 'src/app/_modulos/perfiles/components/perfil-donacion/perfil-donacion.component';
import { PerfilAdopcionComponent } from 'src/app/_modulos/perfiles/components/perfil-adopcion/perfil-adopcion.component';


const routes: Routes = [
  /*{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },*/

  {path: '', component: LayoutComponent, children:[
    {
      path: '',
      redirectTo: '/home/inicio',
      pathMatch: 'full'
    
    },
    {
      path: 'home',
      loadChildren: () => import('./_modulos/home/home.module').then(m => m.HomeModule),
      canActivate:[AuthGuard]
    },
    { 
      path: 'fundacion/:id',
      loadChildren: () => import('./_modulos/fundacion/fundacion.module').then(m => m.FundacionModule),
      //canLoad: [AutenticacionGuard]
      data:[{roles:'4'}]
    },
    {
      path: 'admin',
      loadChildren: () => import('./_modulos/admin/admin.module').then(m => m.AdminModule),
      canActivate:[AdminGuard],
      data:[{roles:'1'}]
    },
    {
      path: 'perfil/mascota/:id/:from/:mascota/:idM',
      component: PerfilMascotaComponent,
     
    },
    {
      path: 'perfil/emergencia/:idE',
      component: PerfilEmergenciaComponent
    },
    {
      path: 'perfil/donacion/:id/:idD',
      component: PerfilDonacionComponent
    },
    {
      path: 'perfil/adopcion/:id/:idA',
      component: PerfilAdopcionComponent
    }

  ]
},
 
  {
    path: 'autenticacion',
    loadChildren: () => import('./_modulos/autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
    canLoad: [AutenticacionGuard],
    canActivate:[AuthGuard]

  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
