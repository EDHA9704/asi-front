import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilMascotaComponent } from './components/perfil-mascota/perfil-mascota.component';
import { PerfilDonacionComponent } from './components/perfil-donacion/perfil-donacion.component';
import { PerfilAdopcionComponent } from './components/perfil-adopcion/perfil-adopcion.component';
import { PerfilEmergenciaComponent } from './components/perfil-emergencia/perfil-emergencia.component';
//import { HeaderComponent } from './components/header/header.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatCardModule, MatAutocompleteModule,MatTabsModule,MatRadioModule} from '@angular/material'
  import { ImageCropperModule } from 'ngx-image-cropper';
  import {MomentModule} from 'angular2-moment';
import { HomeModule} from '../home/home.module'
import { FundacionModule} from '../fundacion/fundacion.module'

@NgModule({
  declarations: [PerfilMascotaComponent, PerfilDonacionComponent, 
    PerfilAdopcionComponent, PerfilEmergenciaComponent],
  imports: [
    CommonModule,
    PerfilesRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgxUsefulSwiperModule,
    MatTabsModule,
    ImageCropperModule,
    MomentModule,
    MatRadioModule,
    HomeModule,
    FundacionModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatCardModule, MatAutocompleteModule
  ]
})
export class PerfilesModule { }
