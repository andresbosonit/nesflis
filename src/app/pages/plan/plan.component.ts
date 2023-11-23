import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan';
import { PlanService } from 'src/app/services/plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  planes: Plan[];
  btnSiguienteHabilitado: boolean = false;

  constructor(private readonly planService: PlanService, private router: Router) { }

  ngOnInit(): void {
    this.changeBodyStyles();
    this.getPlanes();
  }

  async getPlanes(){
    this.planes = await this.planService.getPlanes();
  }

  changeBodyStyles(){
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#FFFFFF';
  }

  onPlanSelected(plan: number): void {
    this.btnSiguienteHabilitado = true
    this.goToPay(plan);
  }

  goToPay(plan: number): void {
    const form = document.querySelector("#siguiente");
    if(plan === 0){
      form.setAttribute("action", "https://buy.stripe.com/test_aEUdUF18W4XW2iI7ss")
    } else if(plan === 1){
      form.setAttribute("action", "https://buy.stripe.com/test_aEUaIt8Bobmkg9y145")
    }else {
      form.setAttribute("action", "https://buy.stripe.com/test_fZe4k53h4620cXmdQS")
    }
    
    
  }

  getButtonStyle(): any {
    return {
      'background-color': this.btnSiguienteHabilitado ? '' : '#F17B81',
      'cursor': this.btnSiguienteHabilitado ? 'pointer' : 'not-allowed'
      // Agrega otros estilos según sea necesario
    };
  }
}
