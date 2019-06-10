import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
    private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const bearerToken = this.authenticationService.getBearerToken();

    const isAuthenticated = this.authenticationService.isUserAuthenticated(bearerToken);
    isAuthenticated.then(resp => {
      if (!resp) {
        console.log('routelogin 1');
        this.routerService.routeToLogin();
      }
      return resp;
    }).catch(err => {
      console.log('routelogin 2');
      this.routerService.routeToLogin();
      return false;
    });

    return isAuthenticated;

  }
}
