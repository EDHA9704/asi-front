import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_modulos/home';
import { AdminComponent } from './_modulos/admin';
import { LoginComponent } from './_modulos/autenticacion';
import { AuthGuard,AutenticacionGuard,AdminGuard} from './_core';
import {NotFoundComponent} from './_shared/components/not-found/not-found.component'
import { Role } from './_models';
const routes: Routes = [
  /*{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },*/
  {path: '', loadChildren: () => import('./_modulos/layout/layout.module').then(m => m.LayoutModule),},
  /*{
    path: '',
    redirectTo: '/home/nosotros',
    pathMatch: 'full'
  },*/
 /* {
    path: 'home',
    loadChildren: () => import('./_modulos/home/home.module').then(m => m.HomeModule),
    canLoad: [AutenticacionGuard],
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
    path: 'perfil',
    loadChildren: () => import('./_modulos/perfiles/perfiles.module').then(m => m.PerfilesModule),
    //canLoad: [AutenticacionGuard]
  },*/
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
