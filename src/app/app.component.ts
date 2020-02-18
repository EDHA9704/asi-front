import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_shared/services';
import { User, Role } from './_models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'asi-front';
  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => {
          console.log(x)
          this.currentUser = x
        }
         );
    }
    get isAdmin() {
      return this.currentUser && this.currentUser.rol === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
