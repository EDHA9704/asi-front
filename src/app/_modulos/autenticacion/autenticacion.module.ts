import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AngMaterialModule} from '../../_shared/ang-material/ang-material.module'
import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material'
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    AngMaterialModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AutenticacionModule { }
