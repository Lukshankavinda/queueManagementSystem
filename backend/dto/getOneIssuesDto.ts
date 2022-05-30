export class getOneIssuesDto {
    id: number|any;
    name: string|any;
    issue_no: number|any;
    tpno: string|any;
    issue: string|any;

    constructor(obj : any){
        if(obj){
        this.id = obj.oneUser_id;
        this.name = obj.oneUser_name;
        this.issue_no = obj.oneUser_issue_no;
        this.tpno = obj.oneUser_tpno;
        this.issue = obj.oneUser_issue;
        }
    }
  }
 
  