import { Component, OnInit } from '@angular/core';
import * as fs from 'browser-fs-access';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  constructor() {
   }

  imageList: string[] = [];

  ngOnInit(): void {
    this.changeBodyStyles();
  }

  changeBodyStyles(){
     // Establecer estilos para el body
     document.body.style.background = '#141414';
     document.body.style.fontFamily = '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif';
     document.body.style.fontWeight = '300';
     document.body.style.color = '#6D6D6D';
     document.body.style.opacity = '0';
     document.body.style.animation = 'fade-in 500ms ease 200ms 1 forwards';
 
     // Estilos para h1 dentro del body
     const h1Elements = document.querySelectorAll('body h1');
     h1Elements.forEach((h1: any) => {
       h1.style.color = '#fff';
       h1.style.fontSize = '50px';
     });
 
     // Estilos para a dentro del body
     const aElements = document.querySelectorAll('body a');
     aElements.forEach((a: any) => {
       a.style.padding = '5px 15px';
       a.style.color = '#6D6D6D';
       a.style.fontSize = '17px';
       a.style.textDecoration = 'none';
       a.style.textTransform = 'uppercase';
       a.style.border = '1px solid #6D6D6D';
       a.style.transition = 'all 300ms ease';
 
       // Hover styles
       a.addEventListener('mouseenter', () => {
         a.style.color = '#fff';
         a.style.border = '1px solid #fff';
       });
 
       a.addEventListener('mouseleave', () => {
         a.style.color = '#6D6D6D';
         a.style.border = '1px solid #6D6D6D';
       });
     });
   }
  }
