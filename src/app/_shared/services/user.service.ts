import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../_models';
import { Observable } from 'rxjs';
import { UsuarioFundacion } from 'src/app/_models/usuarioFundacion';

@Injectable({ providedIn: 'root' })
export class UserService {
    public filtro
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    obtFiltro(){
        let filtro = JSON.parse(localStorage.getItem('busquedaFundacionesSC')); 
        
        if(filtro != "undefined"){
            this.filtro = filtro;
        }else{
            this.filtro = null;
        }
      
        return this.filtro;
      }
      obtFundacionesByNombre(nombre):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'fundaciones-bynombre/'+nombre,{headers:headers});
      }
      obtUsuariosRol(page=null,rol):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'obtener-usuarios-rol/'+rol+'/'+page,{headers:headers});
      }
      filtroFundaciones(filtro:any,page = 1):Observable<any>{
        let params = JSON.stringify(filtro);
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.post(environment.apiUrl+'filtro-fundaciones/'+page, params,{headers:headers});
      }
      obtUsuariosByApellidos(apellidos):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
      
        return this.http.get(environment.apiUrl+'usuarios-byapellidos/'+apellidos,{headers:headers});
      }
      obtUsuario(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
      
        return this.http.get(environment.apiUrl+'usuario/'+id,{headers:headers});
      }
      obtVoluntariosNP(rol):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this.http.get(environment.apiUrl+'obtener-voluntariosNP/'+rol,{headers:headers});
      }
      actualizarUsuario(usuario,id):Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this.http.put(environment.apiUrl+'actualizar-usuario/'+id,params,{headers:headers});
    }
    validarCorreoF(usuario:any):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'validar-correoF', params, {headers:headers});
      
    }
    validarNombreF(usuario:UsuarioFundacion):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'validar-nombreF', params, {headers:headers});
      
    }
    eliminarLogo(id,file,tipo):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.delete(environment.apiUrl+'eliminar-logo/'+id+'/'+file+'/'+tipo, {headers:headers});
      
    }
    cambiarPss(usuario,id):Observable<any>{
      let params = JSON.stringify(usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(environment.apiUrl+'cambiar-pass/'+id, params, {headers:headers});
      
    }
}