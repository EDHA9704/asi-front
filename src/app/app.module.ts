import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MomentModule} from 'angular2-moment';

import { JwtInterceptor, ErrorInterceptor } from './_core';
import { AdminComponent } from './_modulos/admin/components/admin/admin.component';
import { LoginComponent } from './_modulos/autenticacion/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { FundacionComponent } from './_modulos/fundacion/components/fundacion/fundacion.component';
import { SpinnerComponent } from './_shared/components/spinner/spinner.component';

import { PerfilesModule} from './_modulos/perfiles/perfiles.module';
import { FundacionModule} from './_modulos/fundacion/fundacion.module';
import { HomeModule} from './_modulos/home/home.module';

//extrernals
//extrernals
import { NgxSpinnerModule } from "ngx-spinner";
import { EmptyElementComponent } from './_shared/components/empty-element/empty-element.component';
@NgModule({
  declarations: [
    AppComponent,
    EmptyElementComponent,
    //AdminComponent,
    //SpinnerComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MomentModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    /*GeneralModule,
    PerfilesModule,
    FundacionModule,
    HomeModule*/
    //FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
