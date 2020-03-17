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
import {MatBadgeModule} from '@angular/material/badge';
import { FundacionModule} from './_modulos/fundacion/fundacion.module';
import { HomeModule} from './_modulos/home/home.module';
import { LayoutComponent } from 'src/app/_modulos/layout/layout.component';
import { FooterFundacionComponent } from 'src/app/_modulos/layout/footer-fundacion/footer-fundacion.component';
import { MainHeaderComponent} from 'src/app/_modulos/layout/main-header/main-header.component';
import { PerfilAdopcionComponent} from 'src/app/_modulos/perfiles/components/perfil-adopcion/perfil-adopcion.component';
import { PerfilDonacionComponent} from 'src/app/_modulos/perfiles/components/perfil-donacion/perfil-donacion.component';
import { PerfilEmergenciaComponent} from 'src/app/_modulos/perfiles/components/perfil-emergencia/perfil-emergencia.component';
import { PerfilMascotaComponent} from 'src/app/_modulos/perfiles/components/perfil-mascota/perfil-mascota.component';

//extrernals
//extrernals
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule} from '@angular/forms';

import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatAutocompleteModule,MatTabsModule,MatRadioModule} from '@angular/material'
  import { ImageCropperModule } from 'ngx-image-cropper';
  import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LayoutComponent,
    MainHeaderComponent,
    FooterFundacionComponent,
    PerfilAdopcionComponent,
    PerfilDonacionComponent,
    PerfilEmergenciaComponent,
    PerfilMascotaComponent,
   
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
    MatBadgeModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxUsefulSwiperModule ,
    FormsModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
    MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatAutocompleteModule,MatTabsModule,MatRadioModule,
  ImageCropperModule,NgxUiLoaderModule
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
