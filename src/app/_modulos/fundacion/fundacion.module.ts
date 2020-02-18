import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundacionRoutingModule } from './fundacion-routing.module';
import { FundacionComponent } from './components/fundacion/fundacion.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './../../_shared/components/spinner/spinner.component';
import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatCardModule, MatAutocompleteModule} from '@angular/material'
  import {MomentModule} from 'angular2-moment';
  import { NgxSpinnerModule } from "ngx-spinner";
import { MisMascotasComponent } from './components/mis-mascotas/mis-mascotas.component';
import { MisEmergenciasComponent } from './components/mis-emergencias/mis-emergencias.component';
import { MisDonacionesComponent } from './components/mis-donaciones/mis-donaciones.component';
import { MisAdopcionesComponent } from './components/mis-adopciones/mis-adopciones.component';
import { MisVoluntariosComponent } from './components/mis-voluntarios/mis-voluntarios.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import {HeaderComponent} from './components/header/header.component'

@NgModule({
  declarations: [FundacionComponent,SpinnerComponent, 
    MisMascotasComponent, MisEmergenciasComponent, 
    MisDonacionesComponent, MisAdopcionesComponent, 
    MisVoluntariosComponent, ContactanosComponent, MiPerfilComponent,HeaderComponent],
  imports: [
    CommonModule,
    FundacionRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    //AngMaterialModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MomentModule,
    NgxSpinnerModule,
    MatExpansionModule,
    NgxUsefulSwiperModule,

    
  ],
  exports:[
    HeaderComponent
  ]
})
export class FundacionModule { }
