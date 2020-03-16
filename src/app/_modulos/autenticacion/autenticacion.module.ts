import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverComponent} from './components/recover/recover.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from 'src/app/_shared/shared.module'
import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material'
@NgModule({
  declarations: [LoginComponent,RecoverComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    SharedModule
  ]
})
export class AutenticacionModule { }
