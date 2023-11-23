import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  link: string = "http://localhost:8080/plan"

  constructor(private readonly http: HttpClient) { }

  getPlanes(): Promise<Plan[]> {
    return this.http.get<Plan[]>(`${this.link}/search`).toPromise();
  }

}
