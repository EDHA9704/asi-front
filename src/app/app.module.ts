import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MomentModule} from 'angular2-moment';
import { JwtInterceptor, ErrorInterceptor } from './_core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import {MatBadgeModule} from '@angular/material/badge';
import { LayoutComponent } from 'src/app/_modulos/layout/layout.component';
import { FooterFundacionComponent } from 'src/app/_modulos/layout/footer-fundacion/footer-fundacion.component';
import { MainHeaderComponent} from 'src/app/_modulos/layout/main-header/main-header.component';
import { PerfilAdopcionComponent} from 'src/app/_modulos/perfiles/components/perfil-adopcion/perfil-adopcion.component';
import { PerfilDonacionComponent} from 'src/app/_modulos/perfiles/components/perfil-donacion/perfil-donacion.component';
import { PerfilEmergenciaComponent} from 'src/app/_modulos/perfiles/components/perfil-emergencia/perfil-emergencia.component';
import { PerfilMascotaComponent} from 'src/app/_modulos/perfiles/components/perfil-mascota/perfil-mascota.component';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule} from '@angular/forms';

import {MatStepperModule,MatInputModule,MatCheckboxModule,
  MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatAutocompleteModule,MatTabsModule,MatRadioModule} from '@angular/material'
  import { ImageCropperModule } from 'ngx-image-cropper';
  import { NgxUiLoaderModule} from 'ngx-ui-loader';

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
    NgxUsefulSwiperModule ,
    FormsModule,
    MatStepperModule,MatInputModule,MatCheckboxModule,
    MatSelectModule,MatButtonModule,MatMenuModule,
  MatExpansionModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatAutocompleteModule,MatTabsModule,MatRadioModule,
  ImageCropperModule,NgxUiLoaderModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
