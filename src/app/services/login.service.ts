import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oauthService: OAuthService) { }

  public login(): void {

    //localStorage.setItem('asdlnas', String(this.getIsLogged()))
    this.oauthService.initImplicitFlowInternal();
    //localStorage.setItem('despues', String(this.getIsLogged()))
  }

  public logout(): void {
    this.oauthService.revokeTokenAndLogout({client_id: 'spring-client-api-rest'}, false);
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getUsername(): string {
    return this.oauthService.getIdentityClaims()[`preferred_username`];
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    // console.log(payloadDecoded.realm_access.roles);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }
}
