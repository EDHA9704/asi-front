import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { environment } from '../../../../environments/environment';
declare var $:any;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() currentUser:any
  public cargaN;
  public notificaciones=[]
  public total;
  public pages;
  public page;
  public itemsPerPage;
  public status;
  public mensaje;
  private signal:any;
  linksHome = [
    {name:'Inicio',root:'/home/inicio'},
    {name:'Mascotas',root:'/home/mascotas/todos/1'},
    {name:'Fundaciones',root:'/home/fundaciones/todos/1'},
    {name:'Emergencias',root:'/home/emergencias/todos/1'},
  ]
  linksAdmin = [
    {name:'Panel de usuarios',root:'/admin/usuarios'},
    {name:'Aprobar cuentas',root:'/admin/cuentas/all/1'},
    {name:'Registrar fundación',root:'/admin/fundacion-reg'}
  ]
  linksFundacionesSN:any[]= []
  linksFundacionesa:any[]= []
  mainLinks:any[] = []
  keyUrl
  fullUrl:string
  permission:any
  public url
  constructor(public router: Router,private authenticationService: AuthenticationService,
    private _notificacionService:NotificacionService) {
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    this.cargaN = true;
    this.page = 1;
    this.url = environment.apiUrl;
   }

  ngOnInit() {
    console.log(this.currentUser)
    
    this.getLinks()
  $( document ).ready(()=> {
  this.styleHeader()
    this.toggle()
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

  styleHeader(){

    $( document ).ready(()=> {
      this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
      if(this.keyUrl[1] == 'home' && this.keyUrl[2] == 'inicio'){
        $("#header").addClass('transparentHeader')
        $("#header").removeClass('greenHeader')
        $("#header a").removeClass('nav-link-custom')
      }else if(this.keyUrl[1] == 'fundacion' ){
        
        $("#header a").addClass('nav-link-custom')
        $("#header").addClass('darkHeader')
        $("#header").removeClass('transparentHeader')
      }
      
      else if(this.currentUser && this.keyUrl[1] == 'perfil')
        {
          $("#header").removeClass('greenHeader')
          $("#header").addClass('darkHeader')
          $("#header").removeClass('transparentHeader')
          $("#header a").addClass('nav-link-custom')
        }
        else if(this.currentUser && this.keyUrl[1] == 'admin'){
          $("#header").removeClass('greenHeader')
          $("#header").addClass('darkHeader')
          $("#header").removeClass('transparentHeader')
          $("#header a").addClass('nav-link-custom')
        }else{
        $("#header").addClass('greenHeader')
        $("#header").removeClass('darkHeader')
        $("#header").removeClass('transparentHeader')
        $("#header a").removeClass('nav-link-custom')
      }
  });
  }
  getLinks(){
    var idKey = ''
    this.fullUrl = this.router.url.toString()
    this.keyUrl = this.fullUrl.split('/')
    if(!this.currentUser && this.keyUrl[1] == 'home') {this.mainLinks = this.linksHome}
    else if(!this.currentUser && this.keyUrl[1] == 'fundacion'){
      this.permission = false;
      this.mainLinks = [
        {name:'Nosotros',root:'/fundacion/'+this.keyUrl[2]+'/nosotros'},
        {name:'Mascotas',root:'/fundacion/'+this.keyUrl[2]+'/mascotas/todos/1'},
       
        {name:'Donaciones',root:'/fundacion/'+this.keyUrl[2]+'/donaciones/todos/1'},
       
        {name:'Contactanos',root:'/fundacion/'+this.keyUrl[2]+'/contactanos'},
      ]
    }



 
    if(this.currentUser && this.currentUser.usuario.rol == '4') {
      console.log(this.keyUrl)

      if(this.keyUrl[1] == 'fundacion'){
        idKey = this.keyUrl[2]
      }else if(this.keyUrl[1] == 'perfil'){

        idKey = this.keyUrl[3]
      }
      if(this.keyUrl[2] != 'emergencia'){
        if(this.currentUser.usuario._id == idKey){
          this.permission = true;
          this.mainLinks = [
            {name:'Nosotros',root:'/fundacion/'+this.currentUser.usuario._id+'/nosotros'},
            {name:'Mascotas',root:'/fundacion/'+this.currentUser.usuario._id+'/mascotas/todos/1'},
            {name:'Emergencias',root:'/fundacion/'+this.currentUser.usuario._id+'/emergencias/todos/1'},
            {name:'Donaciones',root:'/fundacion/'+this.currentUser.usuario._id+'/donaciones/todos/1'},
            {name:'Adopciones',root:'/fundacion/'+this.currentUser.usuario._id+'/adopciones/todos/1'},
            {name:'Voluntarios',root:'/fundacion/'+this.currentUser.usuario._id+'/voluntarios/todos/1'},
            {name:'Contactanos',root:'/fundacion/'+this.currentUser.usuario._id+'/contactanos'},
          ]
        }else{
          this.permission = false;
          this.mainLinks = [
            {name:'Nosotros',root:'/fundacion/'+this.keyUrl[2]+'/nosotros'},
            {name:'Mascotas',root:'/fundacion/'+this.keyUrl[2]+'/mascotas/todos/1'},
           
            {name:'Donaciones',root:'/fundacion/'+this.keyUrl[2]+'/donaciones/todos/1'},
           
            {name:'Contactanos',root:'/fundacion/'+this.keyUrl[2]+'/contactanos'},
          ]
        }
      }else{
        this.permission = true;
        this.mainLinks = [
          {name:'Nosotros',root:'/fundacion/'+this.currentUser.usuario._id+'/nosotros'},
          {name:'Mascotas',root:'/fundacion/'+this.currentUser.usuario._id+'/mascotas/todos/1'},
          {name:'Emergencias',root:'/fundacion/'+this.currentUser.usuario._id+'/emergencias/todos/1'},
          {name:'Donaciones',root:'/fundacion/'+this.currentUser.usuario._id+'/donaciones/todos/1'},
          {name:'Adopciones',root:'/fundacion/'+this.currentUser.usuario._id+'/adopciones/todos/1'},
          {name:'Voluntarios',root:'/fundacion/'+this.currentUser.usuario._id+'/voluntarios/todos/1'},
          {name:'Contactanos',root:'/fundacion/'+this.currentUser.usuario._id+'/contactanos'},
        ]
      }



    }else if(this.currentUser && this.currentUser.usuario.rol == '1'){
      this.mainLinks = this.linksAdmin;
    }
  } 
  obtallnotificaciones2(page,adding=false){
    console.log("entroo noif ******")
    this.cargaN = true;     
    //this.identity = this._usuarioService.obtIdentity();
    this._notificacionService.obtALLNotificacionesAD(page).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){

            this.notificaciones = response.notificaciones;
            this.cargaN = false;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);  
            this.cargaN = false;      
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
        this.cargaN = false;    
        console.log(<any>error)
      }
    )
  }
  obtallnotificaciones(page,adding=false){
    this.cargaN = true;     
    //this.identity = this._usuarioService.obtIdentity();
    this._notificacionService.obtALLNotificaciones(page).subscribe(
      response=>{

        if(response.notificaciones){
          console.log(response)
          this.total = response.totalPubli;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){

            this.notificaciones = response.notificaciones;
            this.cargaN = false;
          }else{
            var arrayA = this.notificaciones;
            var arrayB = response.notificaciones;
            this.notificaciones = arrayA.concat(arrayB);  
            this.cargaN = false;      
          }
          
          
        }else{
          this.status = 'error';
          this.mensaje = 'No existe notificaciones'
        }
      },
      error=>{
        this.cargaN = false;    
        console.log(<any>error)
      }
    )
  }
async  deleteOneSignal(id,signal){
  this.signal =  await localStorage.getItem('idsignal')
    this._notificacionService.eliminarOneSignal(id,signal).subscribe(
      response=>{
        console.log(response)
        localStorage.removeItem('idsignal');

      },
      error=>{
        console.log(<any>error)
      }
    )
  }
 async cerrarSesion(){
    
    if(this.currentUser.usuario && this.signal && this.signal != null && this.signal != ''){
      this.deleteOneSignal(this.currentUser.usuario._id,this.signal)
    }
   
    await this.authenticationService.logout()
    this.getLinks()
    this.styleHeader()
   /* localStorage.clear();
    this.currentUser = this.authenticationService.currentUserValue;
    //this.identity = null;
    this._router.navigate(['/']);*/
  }
  public noMore = false;
  verMas(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }
   // $("html, body").animate({scrollTop:$('body').prop("scrollHeight")},500);
    this.obtallnotificaciones(this.page, true);
  }

  finSc(){
    

  $("#divNotificacion").scroll(()=>{
  let element = document.getElementById("divNotificacion");
  if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
    this.verMas()
  }
})
  }
  redirectNosotros(nombre,id){
    this.router.navigate(['/fundacion',id]); 
    
  }
}
