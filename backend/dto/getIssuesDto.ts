export class getIssuesDto {
    id!: number;
    name!: string;
    issue_no!: number;
    tpno!: string;

  constructor(obj : any){
    if(obj){
      this.id = obj.id;
      this.name = obj.name;
      this.issue_no = obj.issue_no;
      this.tpno = obj.tpno;
    }
  }
 
  }