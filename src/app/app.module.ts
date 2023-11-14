import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MoviesService } from './services/movies.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesSliderComponent } from './pages/movies-slider/movies-slider.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UserService } from './services/user.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { IndexComponent } from './pages/index/index.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'spring-boot-realm-dev',
        url: 'http://localhost:9090',
        clientId: 'spring-client-api-rest'
      },
      initOptions: {
        pkceMethod: 'S256', 
        // must match to the configured value in keycloak
        redirectUri: 'http://localhost:4200/home',   
        // this will solved the error 
        checkLoginIframe: false,
        flow: "implicit"
    }});
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    SearchComponent,
    NavbarComponent,
    MoviesSliderComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8080'],
          sendAccessToken: true
      }
  })
  ],
  providers: [
    MoviesService, 
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
