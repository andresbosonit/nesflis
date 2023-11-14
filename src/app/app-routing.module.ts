import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginService } from './services/login.service';
import { RedirectToKeycloakGuard } from './redirect-to-keycloak.guard';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: HomeComponent, canActivate: [RedirectToKeycloakGuard]},
  { path: '', component: IndexComponent},
  {
    path: 'home',
    component: HomeComponent,
    //...canActivate(() => redirectUnauthorizedTo(['/login']))
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


