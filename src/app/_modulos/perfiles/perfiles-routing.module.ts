import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilMascotaComponent } from './components/perfil-mascota/perfil-mascota.component';
import { PerfilDonacionComponent } from './components/perfil-donacion/perfil-donacion.component';
import { PerfilAdopcionComponent } from './components/perfil-adopcion/perfil-adopcion.component';
import { PerfilEmergenciaComponent } from './components/perfil-emergencia/perfil-emergencia.component';


const routes: Routes = [

  {
    path: 'mascota/:id/:mascota/:idM',
    component: PerfilMascotaComponent
  },
  {
    path: 'emergencia/:idE',
    component: PerfilEmergenciaComponent
  },
  {
    path: 'donacion/:id/:idD',
    component: PerfilDonacionComponent
  },
  {
    path: 'adopcion/:id/:idA/',
    component: PerfilAdopcionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
