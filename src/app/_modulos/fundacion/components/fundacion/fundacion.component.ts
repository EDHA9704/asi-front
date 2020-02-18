import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/_shared/services/mascota.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { MatSnackBar } from '@angular/material';
import { Historia } from 'src/app/_models/historia';
import { PortadaFundacion } from 'src/app/_models/portadaFundacion';
declare var $:any;
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from '../../../../_shared/services';
import { FundacionService } from 'src/app/_shared/services/fundacion.service';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import { SwiperComponent} from 'ngx-useful-swiper';

@Component({
  selector: 'app-fundacion',
  templateUrl: './fundacion.component.html',
  styleUrls: ['./fundacion.component.scss']
})
export class FundacionComponent implements OnInit {
  mensaje1 = new FormControl('', [Validators.maxLength(30),Validators.minLength(3)]);
  mensaje2 = new FormControl('', [Validators.maxLength(500),Validators.minLength(3)]);
  getErrorMessage() {
    return  this.mensaje1.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje1.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  getErrorMessage2() {
    return  this.mensaje2.hasError('maxlength') ? 'Máximo 30 caracteres':
            this.mensaje2.hasError('minlength') ? 'Mínimo 6 caracteres':
            '';
  }
  public usuarioFundacion:UsuarioFundacion;
  public url;
 
  public token;
 public valid
  public imgUN2:any;
  public imL2 = false;
  public historia:Historia;
  public historiasF=[];
  public idF;
  public lgtHI;

  //variables para guardar las portaas
  public portadasFundacion:UsuarioFundacion[];
  public portada:PortadaFundacion;
  public p;
  public hh = [];

  public advertenciaNewPor 
  public statusNewPor 
  public mensajeNewPor
  public imgUN3:any;
  public imL3 = false;
  config: any = {
    
    slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
  };
  currentUser;
  constructor(private _route:ActivatedRoute,
    private _router:Router, 
    private _mascotaService:MascotaService,/*private _usuarioService:UsuarioService ,*/
    private _uploadService:UploadService, 
    private authenticationService: AuthenticationService,private userService:UserService,
    private _fundacionService:FundacionService,private _messageService:MessagesService) {
      this.url = environment.apiUrl;
      this.currentUser = this.authenticationService.currentUserValue;
      console.log(this.currentUser)
      this.historia = new Historia("","","","");
      this.portada = new PortadaFundacion("","","","","")
      this.lgtHI = false;
     /* $(document).ready(()=>{
        this.prob()
              
          });*/
     }

  ngOnInit() {
    this.loadPage()
    $( document ).ready(()=> {
      console.log( "ready fundaicon!" );
      this.toggle()
  });
  }
  loadPage(){
    this._route.params.subscribe(params =>{
  
      let id = params['id'];
      this.idF = id;    
      this.obtFundacion2()
      this.obtenerHistorias(this.idF);
      this.obtPortadasFundacion(this.idF)
      
       if(this.currentUser && this.currentUser.usuario._id == id){

          this.valid = true;
      }
  
    });
  }
  toggle(){
    const selectElement = (s:any) => document.querySelector(s)
    selectElement('.open').addEventListener('click',()=>{
      selectElement('.nav-list').classList.add('active')

    })
    selectElement('.close').addEventListener('click',()=>{
      selectElement('.nav-list').classList.remove('active')

    })
  }
  obtFundacion2(){

    this.userService.obtUsuario(this.idF).subscribe(
      response=>{
        console.log(response)
        /*$(document).ready(()=>{
          this.prob()
                
            });*/
        this.usuarioFundacion = response.usuario;
      },
      error=>{

      }
    )
  }
  nuevaHI(){
   /* $(document).ready(()=>{
      this.prob()
            
        });*/
    console.log(this.filesToUpload2);
    if((this.historia.titulo.length >= 4 && this.historia.titulo.length <= 25) && (this.historia.descripcion.length >= 15 && this.historia.titulo.length <= 1000) && (this.filesToUpload2 != undefined && this.filesToUpload2 != null)){
      this._fundacionService.registerHistoria(this.historia,this.currentUser.usuario._id).subscribe(
        response=>{
          if(response.historia && response.n == '1'){
              
  
            this._uploadService.makeGileRequest(this.url+'subir-foto-historia/'+response.historia._id,[],this.filesToUpload2,'foto')
            .then((result:any)=>{
  
  
              if(result.n == '8' || result.n == '7' || result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2' ){
                
              }else if(result.n == '3'){
                //form.reset();
                $('#modalHI').modal('hide')
                /*this.snackBar.open('Registro exitoso','Cerrar', {
                  duration: 2000,
                });*/
                this._messageService.showSuccess('Historia','Registro exitoso')
                this.loadPage();
                this.filesToUpload2 = undefined;
                this.imL2 = false;
              
              }else{
                console.log(response)
              }
             
            });
           
          
        }
        },
        error=>{
          /* this.snackBar.open('Algo salio mal, intentalo de nuevo','Cerrar', {
                  duration: 2000,
                });*/
                this._messageService.showError('Historia','Algo salio mal, intentalo de nuevo')
        }
      )
    }else{
      /*this.snackBar.open('No cumple con el número de caracteres','Cerrar', {
        duration: 2000,
      });*/
      this._messageService.showError('Historia','No cumple con el número de caracteres')

    }


  }
  //para registro de mascota
  public filesToUpload2: Array<File>;
  urls2 = new Array<string>();
  fileChangeEvent2(fileInput:any){
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    
     let files = <Array<File>>fileInput.target.files;
    this.urls2 = [];
     if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls2.push(e.target.result);
          this.imgUN2 = e.target.result;
          this.imL2 = true;
        }
        reader.readAsDataURL(file);
      }
    }
     if(this.filesToUpload2 != undefined){
      this.imL2 = false;
    }
  }


  obtenerHistorias(id){
    this.historiasF = []
    this._fundacionService.obtHistoriasFundacion(id).subscribe(
      response=>{
        if(response.historias && response.n == '1'){
            this.historiasF = response.historias;
           /* $(document).ready(()=>{
              this.prob()
                    
                });*/
            if(response.historias.length == 7 ){
              this.lgtHI = true;
            }else{
              this.lgtHI = false;
            }
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
  eliminarPortada(id,file){
    console.log(file)
    this._fundacionService.eliminarLogo(id,file,'FP').subscribe(
      response=>{
       
       this.loadPage();
      }
    ),
    error=>{
      console.log(<any>error)
    }
  }
 

  eliminarHistoria(id,image){
    this._fundacionService.eliminarHistoria(id,image).subscribe(
      response=>{
        console.log(response)
        if(response.n == '1')
        this._messageService.showSuccess('Historia','Historia eliminada')

        this.loadPage();
      },
      error=>{
        this._messageService.showSuccess('Historia','Algo salio mal, intentalo de nuevo')

      }
    )
  }
  obtPortadasFundacion(id){
    this._fundacionService.obtPortadasFundacion(id).subscribe(
      response =>{
        if(response.portadasFundacion){
         
          this.portadasFundacion= response.portadasFundacion;
          console.log(this.portadasFundacion)
         // this.hh = []
        if(this.p == 1){
          for(var i=0; i < this.portadasFundacion.length; i++){

            this.hh.push({
              "numero":i
            })
            this.p++;


          }
        }
         
      
          
        }else{
          //this.status = 'error';
         console.log("mal")

        }
      },
      error=>{
        
        console.log(<any>error);
        //this._router.navigate(['/mascotas']);
      }
    );
  }

  registrarPortada(form){

    if(this.filesToUpload3 != undefined){
      this.advertenciaNewPor = true;
      this.statusNewPor = 'procesando';

      this.portada.mensaje1 = this.mensaje1.value;
      this.portada.mensaje2 = this.mensaje2.value;
      this._fundacionService.registerPortada(this.portada, this.idF).subscribe(
        response =>{
          if(response.portada && response.portada._id && response.n == '1'){
              this._uploadService.makeGileRequest(this.url+'subir-portada-fundacion/'+this.idF+'/'+response.portada._id,[],this.filesToUpload3,'foto')
              .then((result:any)=>{
                //alert('si')

                if(result.n == '6' || result.n == '5' || result.n == '4' || result.n == '2'  || result.n == '1'){
                  this.statusNewPor='error';
                  this.mensajeNewPor = result.message;
                  this.imL3 = false;
                  this.filesToUpload3 = undefined;
                  form.reset();
                  
                  setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
                  this._fundacionService.borrarPortada(response.portada._id).subscribe(
                    response=>{
                      
                    },
                    error=>{

                })
                }else if(result.n == '3'){
                  this.statusNewPor='success';
                  //this.mensajeNewPor = response.message;
                  this.loadPage()
                  $("#exampleModal").modal('hide')
                  $("#mdalPOR")[0].reset();
                 
                 
                  this.filesToUpload3 = undefined;
                  this.imL3 = false;
                 
                  this.portada.foto = result.foto;
                 
                }
                console.log(result)
                //this.status = 'success';
               // $('#modalFundacion').modal('show');
              
              });

             /* this.statusNewPor='success';
              this.mensajeNewPor = response.message;
              
              form.reset();
              this.filesToUpload3 = undefined;
              this.imL3 = false;
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 3000);*/
          }else if(response.n == '5'){
            this.statusNewPor='error';
              this.mensajeNewPor = response.message;
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }else{
            this.statusNewPor='error';
              this.mensajeNewPor = 'Algo salió mal.';
              this.filesToUpload3 = undefined;
              form.reset();
              setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
          }
        },
        error =>{
          console.log(<any>error);
          if(error.error.n == '4' || error.error.n == '3' || error.error.n == '2'){
            this.statusNewPor='error';
            this.mensajeNewPor = error.error.message;
            this.filesToUpload3 = undefined;
            form.reset();
            setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }else{
          this.statusNewPor='error';
          this.mensajeNewPor ='ERROR';
          this.filesToUpload3 = undefined;
          form.reset();
          setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
        }
        }
      );
    }else{
      this.statusNewPor= 'error';
      this.mensajeNewPor = 'Por favor, debes subir una foto para tu portada';
     
      setTimeout(()=>{ this.advertenciaNewPor = false;}, 5000);
    }
    
   }

      //para registro de portada
      public filesToUpload3: Array<File>;
      urls3 = new Array<string>();
      fileChangeEvent3(fileInput:any){
        this.filesToUpload3 = <Array<File>>fileInput.target.files;
        
         let files = <Array<File>>fileInput.target.files;
        this.urls3 = [];
         if (files) {
          for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls3.push(e.target.result);
              this.imgUN3 = e.target.result;
              this.imL3 = true;
            }
            reader.readAsDataURL(file);
          }
        }
         if(this.filesToUpload3 != undefined){
          this.imL3 = false;
        }
      }
}
