import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class RedirectToKeycloakGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private key: KeycloakService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.getLoggedIn()){
        this.router.navigate(['home'])
        return true;
       } 
       this.key.login();
       return false;
       
      }

      getLoggedIn(): boolean {
        var isLogged = false;
        this.key.isLoggedIn()
          .then((res: boolean) => {
            isLogged = res;
          });
        return isLogged;
      }
  }
  
