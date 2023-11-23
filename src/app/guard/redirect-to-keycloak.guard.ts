import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RedirectToKeycloakGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private readonly userService: UserService,
    private router: Router,
    private key: KeycloakService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.getLoggedIn().then((isLogged) => {
      if (isLogged) {
        return this.getIdUser().then((userId) => {
          return this.userService.searchByIdProm(userId).then((res: User) => {
            if (res.subscriptionId) {
              return this.router.parseUrl('/home');
          } else {
              return this.router.parseUrl('/plan');
          }
          });
        });
      } else {
        this.key.login();
        return false;
      }
    });
  }

  async getLoggedIn(): Promise<boolean> {
    return await this.key.isLoggedIn();
  }

  async getIdUser(): Promise<string> {
    const user = await this.key.loadUserProfile();
    return user.id; // Asegúrate de que idSuscripcion sea el nombre correcto en tu modelo de usuario
  }
}
