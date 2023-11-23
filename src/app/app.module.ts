import { APP_INITIALIZER, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PagoComponent } from './pages/pago/pago.component';
import { StripeModule } from 'stripe-angular';
import { NgxStripeModule } from 'ngx-stripe';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'spring-boot-realm-dev',
        url: 'http://localhost:9090',
        clientId: 'spring-client-api-rest'
      },
      initOptions: {
        onLoad: 'check-sso',  // allowed values 'login-required', 'check-sso';
        flow: "implicit"
    }});
}

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
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
    ProfilesComponent,
    PlanComponent,
    PagoComponent,
    
  ],
  imports: [
    NgxStripeModule.forRoot('pk_test_51OFIQYGAd0Yb1G0R9hY6hD5yQF7KJBRw9oU2UBs9R0BFbfbhx3az5lcn1CHTyYhDnpGUYerJLlb4qCAoDXMcp1jW005E80GeRF'),
    NgxStripeModule.forChild('pk_test_51OFIQYGAd0Yb1G0R9hY6hD5yQF7KJBRw9oU2UBs9R0BFbfbhx3az5lcn1CHTyYhDnpGUYerJLlb4qCAoDXMcp1jW005E80GeRF'),
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
  }),
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
