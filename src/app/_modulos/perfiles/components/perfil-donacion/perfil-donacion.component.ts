import { Component, OnInit } from '@angular/core';
import { Donacion } from 'src/app/_models/donacion';
import { Notificacion } from 'src/app/_models/notificacion';
import { ActivatedRoute, Router } from '@angular/router';
import { DonacionService } from 'src/app/_shared/services/donacion.service';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { UserService, AuthenticationService } from 'src/app/_shared/services';
import { MessagesService } from 'src/app/_shared/messages/messages.service';
import {environment} from '../../../../../environments/environment'
import { FormControl, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/_shared/communications/communication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var google:any;
declare var $:any
@Component({
  selector: 'app-perfil-donacion',
  templateUrl: './perfil-donacion.component.html',
  styleUrls: ['./perfil-donacion.component.scss']
})
export class PerfilDonacionComponent implements OnInit {
  public donacionOB
  public voluntariosAS=[];
  public voluntarios:any;
  public voluntariosMix:any = [];
  public identity;
  public token
  public APdonacion:Donacion;
  public mensajeVSLE;
  public url;
  public id;
  public statusAyuda ;
  public mensajeAyuda
  public notificacion:Notificacion;
  public tituloMsj
  public idFun
  public currentUser
  public anadirVoluntarios=false;
  public mensajeConfirmacion = "";
  public tituloConfirmacion = "";
  public tipoConfirmacion =""
  public optionConfirmacion=""

  public tituloAP="";
  public tipoAprobarNegar = ''

  msjDonador = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(10)]);
  msjVoluntarios = new FormControl('', [Validators.required,Validators.pattern('^[a-z A-Z áéíóúÁÉÍÓÚñÑ 0-9 ; : . , -]*$'),Validators.maxLength(500),Validators.minLength(10)]);

  //location
  map:any;
  mapHtml:any;
  contMap = 0
  markerActualUserLocation:any;
  donLatLng = {
    lat:Number,
    lng:Number
  }
  constructor(private _router:Router,private _route:ActivatedRoute,private _donacionService:DonacionService,
  private _notificacionService:NotificacionService,private _userService:UserService, private _messageService:MessagesService,
  private authenticationService: AuthenticationService,private _comunicationService:CommunicationService,private ngxService: NgxUiLoaderService) {
    this.ngxService.startLoader('loader-02');
      this.mensajeVSLE = ""
      this.url = environment.apiUrl;
      this.notificacion= new Notificacion("","","","","","","","");
      this.currentUser = this.authenticationService.currentUserValue;

   }
 
  ngOnInit() {

    this._comunicationService.reload.subscribe(res=>{
      this.obtenerDonacion(this.id)
    })
    this._route.params.subscribe(params =>{
      console.log("ENTRO",params)
      this.id = params['idD'];
      this.idFun = params['id']
      this.obtenerDonacion(this.id)
      
    
    
    })
  }
  obtenerDonacion(id){
    this.voluntariosMix = []
    this.voluntariosAS = []
    this._donacionService.obtDonacion(id).subscribe(
      response=>{
        console.log(response)
        this.donacionOB = response.donacion;
        this.ngxService.stopLoader('loader-02');
        this._comunicationService.perfilFundacionSelec(this.donacionOB.fundacion.logo)
        this.obtVoluntarios()

         
          response.donacion.voluntarios.forEach(vol => {
            



            console.log(vol)
            var voluntario = {
              voluntarioC:'',
              estadoD:''
            }
            this._userService.obtUsuario(vol.voluntario._id).subscribe(
              response=>{
                voluntario.voluntarioC = response.usuario;
                voluntario.estadoD = vol.estado
                this.voluntariosAS.push(voluntario)
                console.log(this.voluntariosAS)
              },
              error=>{
                console.log(<any>error)

              }
            )
        });
        
      
      },
      error=>{
        this._router.navigate(['**']);  
        console.log(<any>error)

      }
    )
  }
  obtVoluntarios(){
   
   ///  this.IDAPdonacion = id;
    // this.tipoAPdonacion = tipo;
   //  this.donacionSelect = dona;
   //  console.log(this.donacionSelect)
   
    let rol = 2;
    
    this._userService.obtVoluntariosNP( rol).subscribe(
      response=>{
        
        if(response.usuarios && response.n == '1'){
          
          this.voluntarios = response.usuarios;
         
          console.log(this.donacionOB.voluntarios)
          console.log(response.usuarios)
        if(this.donacionOB.estado == 4){
          this.voluntarios = []
         // this.voluntariosMix = this.donacionOB.voluntarios;
          var temArray = []

          this.donacionOB.voluntarios.forEach(element => {
            var voluntario = {
              _id:"",
              nombres:"",
              apellidos:"",
              estadoD:"",
              foto:"",
              seleccionado:false
            }
            voluntario._id = element._id;
            voluntario.nombres = element.voluntario.nombres;
            voluntario.apellidos = element.voluntario.apellidos;
            voluntario.foto = element.voluntario.foto;
            voluntario.estadoD = element.estado
            voluntario.seleccionado = true;
            this.voluntariosMix.push(voluntario)
          });
          response.usuarios.forEach(vls => {
            var voluntario2 = {
              _id:"",
              nombres:"",
              apellidos:"",
              estadoD:"",
              foto:"",
              seleccionado:false
            }
            var temv = this.voluntariosMix.filter(x => x._id == vls._id)
            if(temv.length == 0){
              voluntario2._id = vls._id;
              voluntario2.nombres = vls.nombres;
              voluntario2.apellidos = vls.apellidos;
              voluntario2.foto = vls.foto;
              voluntario2.estadoD = ""
              voluntario2.seleccionado = false;
              this.voluntariosMix.push(voluntario2)
            }


          });

         /* for (let index = 0; index < this.voluntarios.length; index++) {
            var voluntario = {
              _id:"",
              nombres:"",
              apellidos:"",
              estadoD:"",
              foto:"",
              seleccionado:false
            }
            voluntario._id = this.voluntarios[index]._id;
            voluntario.nombres = this.voluntarios[index].nombres;
            voluntario.apellidos = this.voluntarios[index].apellidos;
            voluntario.foto = this.voluntarios[index].foto;
            console.log(this.donacionOB.voluntarios[index])
            if(this.donacionOB.voluntarios[index]){
              if(this.voluntarios[index]._id ==  this.donacionOB.voluntarios[index]._id ){
                voluntario.estadoD = this.donacionOB.voluntarios[index].estado
                  voluntario.seleccionado = true
              }
            }
            this.voluntariosMix.push(voluntario)
           
          }*/
          console.log(this.voluntariosMix)
        }
  
        }else{
          console.log("mal")
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
  
      }
    )
  }

  aprobarDonacion(idv,rol){
  
    this.statusAyuda = 'procesando';
  
    this.APdonacion = new Donacion("","","","","","","","","","","","","","");
    var valoresCheck = [];
    var paraNoti = [];
    $("input[type=checkbox]:checked").each(function(){
      valoresCheck.push({
        '_id':this.value,
        'voluntario':this.value,
        'estado':0});
        paraNoti.push({
         
          'voluntarioId':this.value});
  
  });
  console.log(valoresCheck)
  if(valoresCheck.length > 0){
    
    this.APdonacion.voluntarios = valoresCheck;
    console.log(this.APdonacion.voluntarios)
    this._donacionService.asignarDonacion(this.APdonacion,this.donacionOB._id,this.donacionOB.donanteR._id,this.donacionOB.tipo,this.donacionOB.donanteR.rol).subscribe(
        response=>{
         if(response.donacion && response.n == '1'){
          this.notificacion.donacion = response.donacion._id;
          this.notificacion.fundacion = this.currentUser.usuario._id;
          this.notificacion.para = paraNoti;


          this._notificacionService.registerNotificacion(this.notificacion,'dn').subscribe(
            responsee=>{
              if(responsee.notificacion && responsee.n == '1'){
                this._messageService.showSuccess('Donación','Voluntarios asignados')
              
               this.obtenerDonacion(this.id)
                this.statusAyuda = 'success';
                this.tituloMsj = 'Donación asignada'
                this.mensajeAyuda = 'Donación asignada, se notificará a los voluntarios seleccionados para que acepten o rechazen el retirar la donación.'
                $("#modalAyudarEmergencia").modal('show')
                
                
              }else{
                this.statusAyuda = 'error';
                this.mensajeAyuda = 'Algo salió mal, intentalo de nuevo. 44'
                this._messageService.showError('Error','Algo salió mal, intentalo de nuevo')
              }
            },
            errore=>{
              console.log(<any>errore)
              if( (errore != null && errore.error.n == '3') || (errore != null && errore.error.n == '2') ){
                this.statusAyuda ='error';
                this.mensajeAyuda = errore.error.message;
              }else{
                this.statusAyuda = 'error';
                this.mensajeAyuda = 'Algo salió mal al notificar a los voluntarios.';
                this._messageService.showError('Error','No se pudo notificar a los voluntarios, inténtalo de nuevo')

              }
              
            }
          )

         // this._messageService.showSuccess('Emergencia','Voluntarios asignados')

           this.mensajeVSLE = ""
           
           
         }else if(response.n == '4'){
          this._messageService.showError('Error','No tienes permisos para esta acción')

         }
        },
        error=>{
         console.log(<any>error)
         this._messageService.showError('Error','No se pudo registrar la ayuda, inténtalo de nuevo')

     
        }
      )
  }else{
    this.statusAyuda = 'errorVoluntario'
    this.mensajeVSLE = "Selecciona al menos un voluntario";
  }
  
   }
   aprobarDonacionSINA(){
    this.statusAyuda = 'procesando';
   
    var body = {
      msjDonador:this.msjDonador.value
    }
    
    this._donacionService.aprobarDonacion(body,this.donacionOB._id,this.donacionOB.donanteR._id ,'Producto', this.donacionOB.donanteR.rol).subscribe(
        response=>{
         if(response.donacion && response.n == '1'){
          this._messageService.showSuccess('Donación','La donación se aporbro correctamente')
           this.mensajeVSLE = ""
           this.statusAyuda = 'success';
                this.tituloMsj = 'Donación aprobada'
                this.mensajeAyuda = 'Donación aprobada correctamente, se notificó al donador'
                this.obtenerDonacion(this.id)
                $("#modalAyudarEmergencia").modal('show')

         }else if(response.n == '4'){
          this.statusAyuda = 'error';
          this._messageService.showError('Error','No tienes permisos para esta acción')
         }
        },
        error=>{
          this.statusAyuda = 'error';
         console.log(<any>error)
         this._messageService.showError('Error','No se pudo aprobar la donación, inténtalo de nuevo')

        }
      )
  
   }
   aprobarDonacionEco(){
    this.statusAyuda = 'procesando';
    var body = {
      msjDonador:this.msjDonador.value
    }
   this._donacionService.aprobarDonacion(body,this.donacionOB._id,this.donacionOB.donanteR._id, this.donacionOB.tipo,this.donacionOB.donanteR.rol).subscribe(
       response=>{
        if(response.donacion && response.n == '1'){
          this.statusAyuda = 'success';
          this.tituloMsj = 'Donación aprobada'
          this.mensajeAyuda = 'Donación aprobada correctamente, se notificó al donador'
          this.obtenerDonacion(this.id)
          $("#modalAyudarEmergencia").modal('show')
          this._messageService.showSuccess('Donación','La donación fue negada')

         
        }else if(response.n == '4'){
          this.statusAyuda = 'error';
          this._messageService.showError('Error','No tienes permisos para esta acción')
        }
       },
       error=>{
        this.statusAyuda = 'error';
        this._messageService.showError('Error','No se pudo negar la donación, inténtalo de nuevo')

       }
     )
   }
   negarDonacion(){
    this.statusAyuda = 'procesando';
    var body = {
      msjDonador:this.msjDonador.value
    }
   this._donacionService.negarDonacion(body,this.donacionOB._id,this.donacionOB.donanteR._id,this.donacionOB.donanteR.rol).subscribe(
       response=>{
         console.log(response)
        if(response.n == '1'){
          this._messageService.showSuccess('Donación','La donación fue negada')

          this.obtenerDonacion(this.id)
          this.statusAyuda = 'negada';
          this.tituloMsj = 'Donación negada'
          this.mensajeAyuda = 'Donación negada correctamente, se notificó al donador'
          
          $("#modalAyudarEmergencia").modal('show')
     
        }else if(response.n == '4'){
          this.statusAyuda = 'error';
          this._messageService.showError('Error','No tienes permisos para esta acción')

        }
       },
       error=>{
        this.statusAyuda = 'error';
        this._messageService.showError('Error','No se pudo negar la donación, inténtalo de nuevo')

       }
     )
   }

   marcarComoAprobada(){
     var body = {
       msjDonador:this.msjDonador.value,
       msjVoluntarios:this.msjVoluntarios.value
     }
     this._donacionService.aprobarDonacionProductoVl(body,this.donacionOB._id,this.donacionOB.donanteR._id,this.token,this.donacionOB.donanteR.rol).subscribe(
       response=>{
        console.log(response)
        this._messageService.showSuccess('Donación','Se aprobó correctamente la donación.')
        this.obtenerDonacion(this.id)
       },
       error=>{
        this._messageService.showError('Error','No se pudo aprobar, inténtalo de nuevo')

         console.log(<any>error)
       }
     )
   }

   hola(event){
     console.log("cambio")
    var tempVol = []
     $("input[type=checkbox]:checked").each(function(){
      console.log(this.value)
      tempVol.push(this.value)
  
  });
    console.log(tempVol.length)
    console.log(this.voluntariosMix.length)
    if(tempVol.length > this.donacionOB.voluntarios.length){
      console.log("OKEY")
      this.anadirVoluntarios = true
    }else{
      this.anadirVoluntarios = false
    }
   }

   eliminarVoluntarioDonacion(id){

    if(this.donacionOB.voluntarios.length > 1){
      this._donacionService.eliminarVoluntarioDona(this.donacionOB._id,id).subscribe(
        response=>{
         this.obtenerDonacion(this.id)
         this._messageService.showSuccess('Voluntario','Se elimino al voluntario de la donación')
        },
        error=>{
         this._messageService.showError('Error','No se pudo eliminar, inténtalo de nuevo')
 
        }
      )
    }else{
      this._messageService.showError('Error','Debe existir al menos un voluntario para la donación')
    }
 
   }
   reasignarVoluntarioDonacion(id){

      this._donacionService.reasignarVoluntarioDona(this.donacionOB._id).subscribe(
        response=>{
         this.obtenerDonacion(this.id)
         this._messageService.showSuccess('Donación','Se descarto los voluntarios. Puedes asignar nuevos')
        },
        error=>{
         this._messageService.showError('Error','No se pudo reasignar, inténtalo de nuevo')
 
        }
      )

 
   }
   executeConfirmacion(tipo,option){
     this.tipoConfirmacion = tipo;
     this.optionConfirmacion = option;
     console.log(tipo)
    if(tipo == 'delVol'){
      $("#modalConfirmacion").modal('show')
      this.tituloConfirmacion = 'Descartar voluntario'
      this.mensajeConfirmacion = 'Esta acción es irreversible. ¿Estás seguro de eliminar al voluntario de está donación?'
    }else if(tipo == 'reasignar'){
      $("#modalConfirmacion").modal('show')
      this.tituloConfirmacion = 'Reasignar voluntarios'
      this.mensajeConfirmacion = 'Esta acción es irreversible. ¿Estás seguro de reasignar los voluntarios de está donación?. Recuerda'+
      'que los voluntarios que selecciones deberán aceptar o negar nuevamene al solicitud.'
    }
   }
   executeFunction(){
     if(this.tipoConfirmacion == 'delVol'){
      $("#modalConfirmacion").modal('hide')
      this.eliminarVoluntarioDonacion(this.optionConfirmacion)
      this.tipoConfirmacion = ''
      this.optionConfirmacion = ''
    }else if(this.tipoConfirmacion == 'reasignar'){
      $("#modalConfirmacion").modal('hide')
      this.reasignarVoluntarioDonacion(this.donacionOB._id)
      this.tipoConfirmacion = ''
      this.optionConfirmacion = ''
    }
   }

   executeConfirmacionAprobarNegar(tipo,option){
    this.tipoAprobarNegar = tipo;
    if(tipo == 'donSINA'){
      this.tituloAP = 'Aprobar donación'
      $("#modalAprobarNegar").modal('show')
    }else  if(tipo == 'donEco'){
      this.tituloAP = 'Aprobar donación'
      $("#modalAprobarNegar").modal('show')
    }else if(tipo == 'negar'){ 
      this.tituloAP = 'Negar donación'
      $("#modalAprobarNegar").modal('show')
      
    }else if(tipo == 'aproVolun'){

      var tem = this.voluntariosAS.filter(x=> x.estadoD == 1)
      if(tem.length >= 1){
        this.tituloAP = 'Aprobar donación'
        $("#modalAprobarNegar").modal('show')
      }else{
        this._messageService.showError('Error','Almenos un voluntario debe aprobar la solicitud')
      }

    }
   }
   executeFunctionAprobarNegar(){
    if(this.tipoAprobarNegar == 'donSINA'){
      this.tituloAP = ''
      this.aprobarDonacionSINA()
      $("#modalAprobarNegar").modal('hide')
    }else if(this.tipoAprobarNegar == 'donEco'){
      this.tituloAP = ''
      this.aprobarDonacionEco()
      $("#modalAprobarNegar").modal('hide')
    }else if(this.tipoAprobarNegar == 'negar'){
      this.tituloAP = ''
      this.negarDonacion()
      $("#modalAprobarNegar").modal('hide')
    }
    else if(this.tipoAprobarNegar == 'aproVolun'){
      this.tituloAP = ''
      this.marcarComoAprobada()
      $("#modalAprobarNegar").modal('hide')
    }
   }
   anadirVoluntariosToDonacion(){
     var temVolun = []
     var temFinal = []
    $("input[type=checkbox]:checked").each(function(){
      console.log(this.value)

      temVolun.push({
        '_id':this.value,
        'voluntario':this.value,
        'estado':0});
  });
  console.log(temVolun)
  temVolun.forEach((x,index)=> {
    console.log(x)
    //console.log(this.voluntariosAS)
    var tem = this.voluntariosAS.filter(v=>v.voluntarioC._id == x._id)
    if(tem.length == 0){
      temFinal.push(x)
    }
    
  });
  console.log(temFinal)
  var body = {
    voluntarios:temFinal
  }
  console.log(body)
  this._donacionService.anadirVoluntarioDona(body,this.donacionOB._id).subscribe(
    response=>{
      console.log(response)
      this.obtenerDonacion(this.id)
      this._messageService.showSuccess('Donacion','Voluntarios agregados correctamente')
    },
    error=>{
      this._messageService.showError('Error','No se pudo agregar los voluntarios, inténtalo de nuevo')
      console.log(<any>error)
    }
  )

   }

   async loadMap(){
    // const loading = await this.loadController.create()
   //  loading.present()
   // await this.currentLocationUser()
 
   $( document ).ready(()=> {
     const mapEle:HTMLElement = document.getElementById('mapcustom');
  
   
    console.log(mapEle)
    this.mapHtml = mapEle;
    console.log("bien")
    this.donLatLng.lat = this.donacionOB.direccion.latLng.lat
    this.donLatLng.lng = this.donacionOB.direccion.latLng.lng
    console.log("bien2")
    console.log(this.donLatLng)
    this.map = new google.maps.Map(this.mapHtml,{
      center:this.donLatLng,
      zoom:12,
    })
    console.log("bien3")
    google.maps.event.addListenerOnce(this.map,'idle',()=>{
     //loading.dismiss();
     console.log("bien4")
     this.putMarker(this.map,this.donLatLng,'Hello')
    })
   });
   }
   putMarker(map,markerL,text){
    
       
     this.markerActualUserLocation = new google.maps.Marker({
       position:{
         lat:markerL.lat,
         lng:markerL.lng
       },
       draggable: false,
       zoom:8,
       map:map,
       title:text
     })
   
 }
 tabChanged(event){
    
  if(event == 1){

   
      if(this.contMap == 0){
        this.contMap++
          this.loadMap()

      }
    }
}
}
