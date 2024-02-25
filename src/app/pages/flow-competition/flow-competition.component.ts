import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { ApiResponse } from 'src/app/dataTypes/ApiResponse';
import { CompetitionServiceService } from 'src/app/services/competition/competition-service.service';

@Component({
  selector: 'app-flow-competition',
  templateUrl: './flow-competition.component.html',
  styleUrls: ['./flow-competition.component.css']
})
export class FlowCompetitionComponent implements OnInit{

  competitions!: Array<any>;
  userId!: number;
  topMembersCompetions!: any[];

  
  constructor(private competitionService: CompetitionServiceService, private _toastService:ToastService){

  }

  ngOnInit() {
   this.getCompetitionInWaiting();
   this.verifyId(localStorage.getItem("userId"))
  }

  verifyId(id: string | null){
    if(id != null){
      this.userId = +id;
    }
  }

  getCompetitionInWaiting(){    
    this.competitionService.getCompetitionByStatus("in waiting").subscribe((value)=>{
      this.competitions =  (value as ApiResponse).content;
      console.log(this.competitions);
      
    })
  }

  subscribeCompetition(competitionId:number){
    console.log(competitionId);
    
    this.competitionService.addMemberToCompetition(competitionId, this.userId).subscribe({
      next: value => {
        this._toastService.success(value);
        this.getCompetitionInWaiting();

      },error: err =>  {
          this._toastService.error(err.error);
          this.getCompetitionInWaiting();

      }
    })
  }

  getRanking(){
    this.competitionService.getRanking(this.userId).subscribe(
      (response)=>{
        this.topMembersCompetions = response;
        console.log(this.topMembersCompetions);
        
      }
    )
  }

}
