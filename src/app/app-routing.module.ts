import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginService } from './services/login.service';

import { IndexComponent } from './pages/index/index.component';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PagoComponent } from './pages/pago/pago.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, compositeGuard } from './guard/composite.guard';

const routes: Routes = [
  { 
    path: '', 
    component: IndexComponent,
  },

  { 
    path: 'profiles', 
    component: ProfilesComponent ,
    canActivate: [authGuard]
  },

  { 
    path: 'plan', 
    component: PlanComponent,
    canActivate: [authGuard]
  },

  { 
    path: 'pago', 
    component: PagoComponent,
    canActivate: [authGuard]
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  {
    path: 'search',
    component: SearchComponent,
    //...canActivate(() => redirectUnauthorizedTo([ '/login' ]))
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    //...canActivate(() => redirectUnauthorizedTo([ '/login' ]))
  },
  //{ path: '', pathMatch: 'full', redirectTo: '/login' },
  //{ path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private loginService: LoginService){} 
}


