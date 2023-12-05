import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ProfilesComponent } from '../pages/profiles/profiles.component';
import { UserService } from '../services/user.service';

export const compositeGuard: CanActivateFn = (route, state) => {
  return inject(authGuard);
};

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router)
  const user = inject(UserService);
  const res = await keycloak.isLoggedIn();
  if (!res) {
    keycloak.login();
  }
  const res_1 = await keycloak.loadUserProfile();
  user.searchById(res_1.id).subscribe(res_2 => {
    if (res_2.subscriptionId) {
      router.navigate(['profiles']);
    } else {
      router.navigate(['plan'])
    }
    return res_2;
  });
  return await res;
  
};

