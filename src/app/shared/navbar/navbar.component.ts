import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  navBackground: any;
  loggedIn = false;

  constructor (private userService: UserService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleScroll();
      }
    });
  }

  ngOnInit() {
   
  }

  @HostListener('document:scroll')
  handleScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 0) {
      this.navBackground = {
        'background-color': '#0e0e0ede'
      };

      // Cambiar el estilo solo si estás en la página de inicio
      if (this.router.url != '/') {
        this.navBackground = {
          'background-color': '#0e0e0ede',
          'position': 'fixed',
          'top': 0,
          'right': 0,
          'left': 0
        };
      }
    } else {
      this.navBackground = {};
    }
  }

  onClick () {
    this.userService.logout()
  }
}
