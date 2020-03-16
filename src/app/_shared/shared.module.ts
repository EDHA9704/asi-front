import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { MapCustomComponent } from './components/map-custom/map-custom.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {EmptyElementComponent} from './components/empty-element/empty-element.component'
import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
MatAutocompleteModule,MatCardModule,MatPaginatorModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { LoadingCustomComponent } from './components/loading-custom/loading-custom.component'

import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

@NgModule({
  declarations: [SpinnerComponent, MapCustomComponent, LoadingCustomComponent,EmptyElementComponent],
  entryComponents:[MapCustomComponent,LoadingCustomComponent,EmptyElementComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
MatAutocompleteModule,MatCardModule,
FormsModule,ReactiveFormsModule,
MatPaginatorModule,
NgxUiLoaderModule,MatTabsModule
  ],
  exports:[
    SpinnerComponent,
    MapCustomComponent,

    LoadingCustomComponent,
    EmptyElementComponent,
    MatStepperModule,MatInputModule,MatCheckboxModule,
  MatIconModule,MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,
MatAutocompleteModule,MatCardModule,MatPaginatorModule,MatTabsModule,
FormsModule,ReactiveFormsModule
  ]
})
export class SharedModule { }
