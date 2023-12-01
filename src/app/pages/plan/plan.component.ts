import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/interfaces/plan';
import { PlanService } from 'src/app/services/plan.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  planes: Plan[];
  btnSiguienteHabilitado: boolean = false;
  plan: number;
  planId: string;

  constructor(private readonly planService: PlanService, private router: Router, private paymentService: PaymentService) { }

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

  onPlanSelected(plan: number, planId: string): void {
    this.btnSiguienteHabilitado = true
    this.plan = plan;
    this.planId = planId;
  }

  goToPay(): void {
    this.paymentService.createPaymentLink(this.planId)
      .subscribe(res => {
        console.log(res);
        
        if(this.plan === 0){
          window.location.href = res.res;
        } else if(this.plan === 1){
          window.location.href = res.res;
        }else {
          window.location.href = res.res;
        }
      })
    
    
  }

  getButtonStyle(): any {
    return {
      'background-color': this.btnSiguienteHabilitado ? '' : '#F17B81',
      'cursor': this.btnSiguienteHabilitado ? 'pointer' : 'not-allowed'
      // Agrega otros estilos según sea necesario
    };
  }
}
