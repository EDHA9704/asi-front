import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService, UserService } from 'src/app/_shared/services';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss']
})
export class ContactanosComponent implements OnInit {
  public idFun;
  public url;
  public currentUser
  public fundacion:UsuarioFundacion;
  constructor(private authenticationService: AuthenticationService,private _route:ActivatedRoute,
    private _router:Router,private _userService:UserService) { 
    this.currentUser = this.authenticationService.currentUserValue;
    this.url = environment.apiUrl;
  }

  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    this._route.params.subscribe(params =>{
      this.idFun = params['id'];
     
      this.obtFundacion(this.idFun);
      
      
     
     
      
    })
  }
  obtFundacion(id){

    this._userService.obtUsuario(id).subscribe(
      response=>{
       
        this.fundacion = response.usuario;
        console.log(this.fundacion)
       
      },
      error=>{
        console.log(<any>error);
      }
    )
    

  }
}
