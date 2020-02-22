import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, AuthenticationService } from '../../../../_shared/services';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {UsuarioFundacion} from '../../../../_models/usuarioFundacion';
import { environment } from '../../../../../environments/environment'; 

@Component({
  selector: 'app-aciudadanos',
  templateUrl: './aciudadanos.component.html',
  styleUrls: ['./aciudadanos.component.scss'],
  providers:[UserService]
})
export class AciudadanosComponent implements OnInit {
  public fundaciones:any;
  public url;
  public identity;
  public token;
  public usuarioFundacion:UsuarioFundacion;
  public carga;

  displayedColumns: string[] = ['nombres','edad','correo','estado'];
 

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 // displayedColumns: string[] = ['nombre'];
  //dataSource = ELEMENT_DATA;
  dataSource:any;
   
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public currentUser;
  constructor(private _route:ActivatedRoute,
    private _router:Router, private _userService:UserService,private authenticationService: AuthenticationService) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.url = environment.apiUrl;
      this.carga = true;
    }

  ngOnInit() {
    this._route.params.subscribe(params =>{

        this.obtCiudadanos()
      

    });
  }
  obtCiudadanos(){
    
    this._userService.obtUsuariosRolSP('3').subscribe(
      response=>{
        if(response.usuarios && response.n == '1'){
          this.carga = false;
            this.fundaciones = response.usuarios;
            this.dataSource = new MatTableDataSource<UsuarioFundacion>(this.fundaciones);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.fundaciones)
        }
      },
      error=>{
        this.carga = false;
        console.log(<any>error)
      }
    )
  }
}
