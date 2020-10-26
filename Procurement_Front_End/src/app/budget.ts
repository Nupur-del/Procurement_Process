export interface IBudget {
  department: string;
  budget: number;
}

export class Budget {
  department: string;
  budget: number;

  constructor(department?: string, budget?: number){
    this.department = department;
    this.budget = budget;
  }
}
