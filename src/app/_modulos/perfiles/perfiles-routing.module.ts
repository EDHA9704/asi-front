import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilMascotaComponent } from './components/perfil-mascota/perfil-mascota.component';
import { PerfilDonacionComponent } from './components/perfil-donacion/perfil-donacion.component';
import { PerfilAdopcionComponent } from './components/perfil-adopcion/perfil-adopcion.component';
import { PerfilEmergenciaComponent } from './components/perfil-emergencia/perfil-emergencia.component';


const routes: Routes = [

  {
    path: 'mascota/:name/:mascota/:idM/:id',
    component: PerfilMascotaComponent
  },
  {
    path: 'emergencia/:idE',
    component: PerfilEmergenciaComponent
  },
  {
    path: 'donacion/:idD/:id',
    component: PerfilDonacionComponent
  },
  {
    path: 'adopcion/:idA/:id',
    component: PerfilAdopcionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
