import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent} from './components/admin/admin.component';
import { HeaderAdminComponent} from './components/header/header-admin.component';
import {AFundacionesComponent } from './components/afundaciones/afundaciones.component';
import {AvoluntariosComponent } from './components/avoluntarios/avoluntarios.component';
import {AciudadanosComponent } from './components/aciudadanos/aciudadanos.component';
import { AprobarComponent} from './components/aprobar/aprobar.component';
import { NewfundacionComponent} from './components/newfundacion/newfundacion.component';

import {MatStepperModule,MatInputModule,MatCheckboxModule, 
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatCardModule, MatAutocompleteModule,MatPaginatorModule} from '@angular/material'
  import {MomentModule} from 'angular2-moment';
  import {MatTabsModule} from '@angular/material/tabs';
  import { FormsModule,ReactiveFormsModule } from '@angular/forms';
  import {MatTableModule} from '@angular/material/table';
import { PanelComponent } from './components/panel/panel.component';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [AdminComponent,HeaderAdminComponent,AFundacionesComponent,NewfundacionComponent,
  AvoluntariosComponent,AciudadanosComponent,AprobarComponent, PanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MomentModule,
    FormsModule,ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule,MatInputModule,MatCheckboxModule, 
    MatTooltipModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatCardModule, MatAutocompleteModule
  ]
})
export class AdminModule { }
