import { Injectable } from '@angular/core';
import { Budget, IBudget } from '../app/budget';
import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget: any;

  constructor(private http: HttpClient) { }

  getBudgetByDept(department: string, location: string): Observable<IBudget> {
    const budgetParams = new HttpParams().set('department', department).set('location', location);
    return this.http.get<IBudget>(environment.BASE_URL + 'budget/budget_by_deptID', {params: budgetParams});
  }

  updateBudget(dept: string, loc: string, cost: number) {
    const updateBud = {
      location: loc,
      department: dept,
      budget: cost
    };
    return this.http.post(environment.BASE_URL + 'budgets/updateBudget', updateBud);
  }

  getallbudget() {
    return this.http.get(environment.BASE_URL + 'budget/allbudget');
  }

  updationofBudget(dept: number, loc: string, cost: number) {
    const updateBud = {
      location: loc,
      department: dept,
      budget: cost
    };
    return this.http.put(environment.BASE_URL + 'budget/budgetupdate', updateBud);
  }
}
