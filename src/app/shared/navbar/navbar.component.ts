import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  navBackground: any;
  loggedIn = false;

  constructor (private userService: UserService, private router: Router, private keycloakService: KeycloakService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleScroll();
      }
    });
  }

  ngOnInit() {
   this.getUserLoggedIn();
  }

  @HostListener('document:scroll')
  handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= 0) {
      this.navBackground = {
        'background-color': '#0e0e0ede'
      };

      // Cambiar el estilo solo si estás en la página de inicio
      if (this.router.url == '/home') {
        this.navBackground = {
          'background-color': '#0e0e0ede',
          'position': 'fixed',
          'top': 0,
          'right': 0,
          'left': 0,
          'z-index': 1030
        };
      }else {
        this.navBackground = {
         
        };
      }
    } 
  }

  async logout () {
   return this.keycloakService.logout("http://localhost:4200/");
  }

  async getUserLoggedIn(){
    this.loggedIn = await this.keycloakService.isLoggedIn()
  }
}
