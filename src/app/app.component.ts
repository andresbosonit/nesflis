import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from './services/user.service';
import { User } from './interfaces/User';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  title="NetflixClone"
  options: Keycloak.KeycloakLoginOptions = {
    redirectUri: "http://localhost:4200/search"
  }
  isProfilesRoute: boolean = false;
  existe: boolean = false;
  private user: User = {
    email: "",
    emailVerified: false,
    firstName: "",
    idUser: "",
    lastName: "",
    password: "",
    unsubscribeDate: new Date,
    username: "",
    subscriptionId: 0
  };

  constructor(private readonly keycloak: KeycloakService, private readonly router: Router, private readonly userService: UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isProfilesRoute = this.router.url === '/profiles';
      }
    });
  }

  public async ngOnInit() {
    
      this.keycloak.isLoggedIn().then(res => {
        if(res && !this.existe){
          this.keycloak.loadUserProfile().then((res: KeycloakProfile) => {
            this.user.idUser = res.id || '';
            this.user.email = res.email || '';
            this.user.emailVerified = res.emailVerified || false;
            this.user.firstName = res.firstName || '';
            this.user.lastName = res.lastName || '';
            this.user.username = res.username || '';
            this.userService.create(this.user).subscribe();
            this.userService.searchById(this.user.idUser).subscribe((res: any) => {
              console.log(res);
            
            });
          })
        }
      });

    this.isLoggedIn = await this.keycloak.isLoggedIn();
  }

  public login() {
    this.keycloak.login(this.options);
  }

  public logout() {
    this.keycloak.logout("http://localhost:4200/");
  }

  async getUserById(){
    if(this.isLoggedIn){
      this.userService.searchById(this.user.idUser)
    }
  }
}


