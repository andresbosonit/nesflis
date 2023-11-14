import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-slider',
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.scss']
})
export class MoviesSliderComponent implements OnInit {

  bannerResult?: any = [];

  constructor (private moviesService: MoviesService, private loginService: LoginService) { }

  ngOnInit (): void {
    this.bannerData();
  }

  bannerData () {
    this.moviesService.sliderMovies().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }

  logout(){
    this.loginService.logout();
  }

}
