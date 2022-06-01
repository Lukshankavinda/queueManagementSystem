export class getIssuesDto {
    id!: number;
    name!: string;
    issue_no!: number;
    tpno!: string;
    counter_id!: number;

  constructor(obj : any){
    if(obj){
      this.id = obj.user_id;
      this.name = obj.user_name;
      this.issue_no = obj.user_issue_no;
      this.tpno = obj.user_tpno;
      this.counter_id = obj.user_counterId;

    }
  }
 
}