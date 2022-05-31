export class getCounterDto {
    name!: string;
    counter_number!: number;
    
  constructor(obj : any){
    if(obj){
      this.name = obj.name;
      this.counter_number = obj.counter_number;
    }
  }
 
}