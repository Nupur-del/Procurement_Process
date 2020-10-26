export interface ILocation {
  id: number;
  order_id: number;
  location: string;
  department: string;
}

export class Location {
  id: number;
  order_id: number;
  location: string;
  department: string;

  constructor(id ?:number, order_id ?: number, location?: string,
    department?: string){
    this.order_id = order_id;
    this.location = location;
    this.department = department;
}

}
