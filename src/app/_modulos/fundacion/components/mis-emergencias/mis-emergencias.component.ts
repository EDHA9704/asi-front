import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergenciaService } from 'src/app/_shared/services/emergencia.service';
import {environment} from '../../../../../environments/environment'
import { UserService, AuthenticationService } from 'src/app/_shared/services';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';
declare var $:any
@Component({
  selector: 'app-mis-emergencias',
  templateUrl: './mis-emergencias.component.html',
  styleUrls: ['./mis-emergencias.component.scss']
})
export class MisEmergenciasComponent implements OnInit,DoCheck{
  public tipoE = ["Todos","Mal estado de salud","Accidente","Preñada","Con cachorros","Maltrato","Abandono"];
  public type;
  public pagesSelec;
  public fundacion:UsuarioFundacion;
  public mensaje;
  public n;
  public advertencia;
  public status;
  public emergencias:any;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public next_page;
  public prev_page;
  public newEmer;
  public filtroBTN;
  public filtroBSQ = [];
  public bus
  public fl
  public carga
  public itemsEmer
  public imgCom
  public url
  public select
  public idFun
  public name
  public currentUser;
  constructor(private _route:ActivatedRoute,
    private _router:Router,private _emergenciaService:EmergenciaService,
    private _userService:UserService,private router: Router,private authenticationService: AuthenticationService) { 
    this.filtroBSQ = this._emergenciaService.obtFiltro();
    this.url = environment.apiUrl;
    this.page = 1;
    this.bus = false;
    this.itemsEmer = 0;
    this.currentUser = this.authenticationService.currentUserValue;

    this.advertencia = false;
    this.carga = true;
  }

  ngOnInit() {
    this.page = 1;
    this.actualPage();
    //this.obtVoluntarios()
    $(document).ready(()=>{
      $("#tipoDrop").change(()=>{

        this.select = $("#tipoDrop").val();
        this.filtroBSQD(this.select)
    });
    $("#nivelDrop").change(()=>{

      this.select = $("#nivelDrop").val();
      this.filtroBSQD(this.select)
  });

  }); 
  }
  ngDoCheck(){

    this.filtroBSQ = this._emergenciaService.obtFiltro();
    
  }
  actualPage(){
    this.type = ''
    this.pagesSelec = []
   //this.statusAyuda = null;
  // $('#modalAyudarEmergencia').modal('hide')
  this._route.params.subscribe(params =>{
    let tipo = params['tipo'];
    this.type = tipo;
    this.idFun = params['id'];
    this.name= params['name'];
    //this.name= '/'+this.name;
    let page = +params['page'];
    this.page = page;
    this.obtFundacion(this.idFun)
   /* let newF = params['new'];
    if(newF == 'new'){
      this.newEmer = true;
    }*/
   
    if(!params['page']){
      page = 1;
      this.page = 1;
    }
    
    if(!page){
      page = 1;
    }else{
      this.next_page = page+1;
      this.prev_page = page-1;

      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
    }

    if(this.type == 'busqueda'){
      this.filtroBTN = true;
      this.filtroBSQ.forEach(elem => {
        $(document).ready(()=>{
        if(elem.tipo == 'tipoE'){
          $("#tipoDrop").val(elem.option)
        }
        if(elem.tipo == 'nivelE'){
          $("#nivelDrop").val(elem.option)
        }
        
      })
      });
      
     
      this.buscarEmergencias(page)
    }else{
      $(document).ready(()=>{
      $("#tipoDrop").val('Todos')
      $("#nivelDrop").val('Todos')
      })
      this.filtroBTN = false;
      //devolver listado de emergencias
      this.obtEmergencias(page);
    }

    
  });
}
obtFundacion(id){

  this._userService.obtUsuario(id).subscribe(
    response=>{
      console.log("entro")
      
      this.carga == false
      this.fundacion = response.usuario;
      
    },
    error=>{
      this.router.navigate(['**']);  
      console.log(<any>error);
    }
  )
  

}
verFoto(foto){
  $('#modalComprobante').modal('show')
  this.imgCom = foto;

}
 obtEmergencias(page){
   let rol = 4;
   this.pagesSelec = []
  
   this._emergenciaService.obtEmergencias(page).subscribe(
     response=>{
       this.carga = false;
       if(response.emergencias && response.n == '1'){

         this.total = response.total;
         this.pages = response.pages;
        
         this.itemsPerPage = response.itemsPerPage;
         this.emergencias = response.emergencias;
         for (let i = 1; i <= this.pages; i++) {
           this.pagesSelec.push(i)
           
         }
         this.itemsEmer = this.emergencias.length;
         this.status ='success';
         this.advertencia = false;


       }else{
         console.log(response.n)
         this.status = 'error';
         this.mensaje = 'Algo salió mal.'
       }
     },
     error=>{
       $(".carga").fadeOut("slow");
       var errorMessage = <any>error;
       console.log(errorMessage)
       this.carga = false;
       this.advertencia = true;
       this.status = 'error';
       if((errorMessage != null && error.error.n == '2')){
         this.mensaje = 'Lo sentimos, no existe emergencias en este momento.';
       }else{
         this.mensaje = 'Algo salio mal, intentalo de nuevo222.'
       }
     }
   )
 }
 buscarEmergencias(page,adding=false){
  this.pagesSelec = []
  this._emergenciaService.filtroEmergencias(this.filtroBSQ,page).subscribe(
    response=>{
      this.carga = false;
      if(response.emergencias && response.n == '1'){

        this.advertencia = false;
        this.total = response.total;
        this.pages = response.pages;
        this.itemsPerPage = response.itemsPerPage;
        this.emergencias = response.emergencias;
        for (let i = 1; i <= this.pages; i++) {
          this.pagesSelec.push(i)
          
        }
        console.log(this.emergencias)
        this.itemsEmer = this.emergencias.length;
        this.status ='success';

        if(page > this.pages){
          this._router.navigate(['fundacion',this.idFun,'emergencias','all'])
          
        }
      }
    },
    error=>{
      this.carga = false;
      this.advertencia =true;
      this.status = 'error';  
      $(".carga").fadeOut("slow");
      var errorMessage = <any>error;
     
      
      if(errorMessage != null && error.error.n == '2'){
        this.mensaje = 'Lo sentimos, '+error.error.message;
        this.emergencias = null;
      }else if(errorMessage != null && error.error.n == '5'){
        this.mensaje = 'No se ha elegigo filtros';
        this.emergencias = null;
      }
      
      else{

        this.n = 'n';
        
        this.mensaje = 'Algo salio mal, intentalo mas tarde'
      }
    }
  )
}
cancelarBus(){
   
  this.bus = false;
  localStorage.removeItem('busquedaEmergencias2');
  this._router.navigate(['/fundacion',this.name,this.idFun,'emergencias','todos','1']);
}

filtroBSQD(option){

  
  var optionFinal = option;
  if(optionFinal == 'Mal estado de salud' || optionFinal == 'Accidente' || optionFinal == 'Preñada' || optionFinal == 'Con cachorros'|| optionFinal == 'Maltrato' || optionFinal == 'Abandono'){
    
    if(this.filtroBSQ == null){
     
      this.filtroBSQ = [];
      this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
      
    }else{
     var ok = false;
      this.filtroBSQ.forEach(fl => {
        if(fl.tipo == 'tipoE'){
          ok = true;
          fl.option = optionFinal;
        }

      });

      if(ok == false){
        this.filtroBSQ.push({tipo:'tipoE',option:optionFinal})
      }
    }

    localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
  }

  if(optionFinal == 'Atención inmediata' || optionFinal == 'Muy urgente' || optionFinal == 'Urgente' || optionFinal == 'Normal' || optionFinal == 'No urgente'){
    if(this.filtroBSQ == null){
     
      this.filtroBSQ = [];
      this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
    }else{
      var ok2= false;
      this.filtroBSQ.forEach(fl => {
        if(fl.tipo == 'nivelE'){
          ok2 = true;
          fl.option = optionFinal;
        }


      });

     
      if(ok2 == false){
        this.filtroBSQ.push({tipo:'nivelE',option:optionFinal})
      }
    }

    localStorage.setItem('busquedaEmergencias2', JSON.stringify(this.filtroBSQ));
  }

  if(this.type == 'busqueda'){
    this.buscarEmergencias(this.page)
  }
  this._router.navigate(['/fundacion',this.name,this.idFun,'emergencias','busqueda','1']);
  
  

}
}
