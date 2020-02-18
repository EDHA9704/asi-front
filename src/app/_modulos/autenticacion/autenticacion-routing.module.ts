import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard,AutenticacionGuard } from '../../_core';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canLoad: [AutenticacionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
