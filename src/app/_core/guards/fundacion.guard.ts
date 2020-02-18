import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_shared/services';

@Injectable({
  providedIn: 'root'
})
export class FundacionGuard implements CanActivate {
  constructor( private router: Router,
    private authenticationService: AuthenticationService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      console.log("hola GUARD FUNDACION")
      console.log(next) 
      if (currentUser) {
        console.log("hola2") 
        console.log(currentUser) 
          // check if route is restricted by role
          if (next.data.roles && next.data.roles.indexOf(currentUser.usuario.rol) === -1) {
            console.log("ENTRO IF")
              // role not authorised so redirect to home page
              this.router.navigate(['/home']);
              return false;
          }

          // authorised so return true
          return true;
      }else if(!currentUser){
        console.log("entroo")
        // not logged in so redirect to login page with the return url
      this.router.navigate(['/autenticacion'], { queryParams: { returnUrl: state.url } });
      return true;
      }

  }
  
}
