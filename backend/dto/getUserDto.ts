export class getUserDto {
    name!: string;
    
  constructor(obj : any){
    if(obj){
      this.name = obj.name;
    }
  }
 
}