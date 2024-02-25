import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { CompetitionServiceService } from 'src/app/services/competition/competition-service.service';

@Component({
  selector: 'app-subscription-competitions',
  templateUrl: './subscription-competitions.component.html',
  styleUrls: ['./subscription-competitions.component.css']
})
export class SubscriptionCompetitionsComponent implements OnInit{

  competitions!: Array<any>;
  userId!: number;
  topMembers!: any[];
  constructor(private competitionService: CompetitionServiceService, private _toastService:ToastService){

  }

  ngOnInit() {
   this.verifyId(localStorage.getItem("userId"));
   this.getCompetitionsSubscription()
  }

  verifyId(id: string | null){
    if(id != null){
      this.userId = +id;
    }
  }

  getCompetitionsSubscription(){
    this.competitionService.getCompetitionsSubscription(this.userId).subscribe(
      (value)=>{
        this.competitions = value
        console.log(value);
        
      }
    )
  }

  getRanking(){
    this.competitionService.getRanking(this.userId).subscribe(
      (response)=>{
        this.topMembers = response;
        console.log(this.topMembers);
        
      }
    )
  }

}
