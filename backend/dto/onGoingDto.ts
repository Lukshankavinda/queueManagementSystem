export class onGoingDto {
    id!:number;
    counterId!: number;
    issue_no!: number;
    ongoin!: number;

    constructor(obj : any){
        if(obj){
            this.id = obj.id;
            this.counterId = obj.counterId;
            this.issue_no = obj.issue_no; 
            this.ongoin = obj.ongoin;
        }
    }
}