import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard,AutenticacionGuard,AdminGuard} from 'src/app/_core';


const routes: Routes = [
  {path: '', component: LayoutComponent, children:[
    {
      path: '',
      redirectTo: 'home',
    
    },
    {
      path: 'home',
      loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      canActivate:[AuthGuard]
    },
    {
      path: 'fundacion/:id',
      loadChildren: () => import('../fundacion/fundacion.module').then(m => m.FundacionModule),
      //canLoad: [AutenticacionGuard]
      data:[{roles:'4'}]
    },
    {
      path: 'admin',
      loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
      canActivate:[AdminGuard],
      data:[{roles:'1'}]
    },
    {
      path: 'perfil',
      loadChildren: () => import('../perfiles/perfiles.module').then(m => m.PerfilesModule),
      //canLoad: [AutenticacionGuard]
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
