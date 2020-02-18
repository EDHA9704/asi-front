import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_modulos/home';
import { AdminComponent } from './_modulos/admin';
import { LoginComponent } from './_modulos/autenticacion';
import { AuthGuard,AutenticacionGuard } from './_core';

import { Role } from './_models';
const routes: Routes = [
  /*{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },*/
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./_modulos/home/home.module').then(m => m.HomeModule),
    canLoad: [AutenticacionGuard],
    canActivate:[AuthGuard]
  },
  {
    path: ':name/:id',
    loadChildren: () => import('./_modulos/fundacion/fundacion.module').then(m => m.FundacionModule),
    //canLoad: [AutenticacionGuard]
    data:['4']
  },
  {
    path: 'admin',
    loadChildren: () => import('./_modulos/admin/admin.module').then(m => m.AdminModule),
    //canLoad: [AutenticacionGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./_modulos/perfiles/perfiles.module').then(m => m.PerfilesModule),
    //canLoad: [AutenticacionGuard]
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./_modulos/autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
    canLoad: [AutenticacionGuard],
    canActivate:[AuthGuard]

  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
