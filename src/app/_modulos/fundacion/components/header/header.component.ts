import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_shared/services';
import { NotificacionService } from 'src/app/_shared/services/notificacion.service';
import { environment } from '../../../../../environments/environment';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public permission: boolean;
  public id;
  public name;
  public currentUser:any
  public cargaN;
  public notificaciones=[]
  public total;
  public pages;
  public page;
  public itemsPerPage;
  public status;
  public mensaje;
  public url
  public idFun
  private signal:any;
  constructor(private _route:ActivatedRoute,private authenticationService: AuthenticationService,
    private _notificacionService:NotificacionService,
    private _router:Router) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.cargaN = true;
    this.page = 1;
    this.url = environment.apiUrl;
    
    console.log(this.currentUser)
  }

  ngOnInit() {
    this.loadPage()
    this.signal =  localStorage.getItem('idsignal')
    console.log(this.signal)
    if(this.currentUser){
      $(document).ready(()=>{
        this.finSc()
      var element = document.getElementById('dropNOTIF'); 
      if (element.scrollHeight - element.scrollTop === element.clientHeight) { 
       console.log("llegaste al final")
      } 
     })
    }

   this.loadPage()


   $( document ).ready(()=> {
     console.log( "ready fundaicon!" );
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
  loadPage(){
    this._route.params.subscribe(params =>{
     
      this.id = params['id'];
      this.name = params['name'];
      console.log("estoy aquiiiii *************")
      console.log(this.name)
      //this.name = this.name
      //console.log(this.name)
      
      if(this.currentUser && this.currentUser.usuario.rol == '4'){
        this.idFun =this.currentUser.usuario._id
        this.permission = true;
    }else{

    }
    })
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
  cerrarSesion(){
    if(this.currentUser.usuario && this.signal && this.signal != null && this.signal != ''){
      this.deleteOneSignal(this.currentUser.usuario._id,this.signal)
    }
   
    this.authenticationService.logout()

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
    this._router.navigate(['/fundacion',id]); 
    
  }
}
