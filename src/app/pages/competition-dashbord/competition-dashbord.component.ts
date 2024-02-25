import {Component, OnInit} from '@angular/core';
import {CompetitionServiceService} from "../../services/competition/competition-service.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "angular-toastify";
import {FormBuilder} from "@angular/forms";
import {MemberServiceService} from "../../services/member/member-service.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-competition-dashbord',
  templateUrl: './competition-dashbord.component.html',
  styleUrls: ['./competition-dashbord.component.css']
})
export class CompetitionDashbordComponent implements OnInit{
  huntingForm!: any;
  responseFishs!: any;
  userId!: number | null; 
  competitionDetails: any;
  competitionMember: any;
  competitionId!: number;
  id!:number;
  top3Members!: any[];
  constructor(private competitionService: CompetitionServiceService, private memberService: MemberServiceService, private route: ActivatedRoute, private _toastService: ToastService, private form:FormBuilder) {
    this.initForm()
  }

  ngOnInit() {
    this.getUserId(localStorage.getItem("userId"));
    this.getFish();
    this.route.params.subscribe(params => {
      this.competitionId = parseInt(params['competitionId']);
      this.getCompetitionDetails(this.competitionId);
      this.getRanking(this.competitionId);
    });
  }

  initForm(){
    this.huntingForm = this.form.group({
      weight: [''],
      member: [''],
      fishId: ['']
    })
  }
  getFish(){
    this.memberService.getFish().subscribe(
      {
        next: value =>
        {
          this.responseFishs = value;

        }
      }
    )
  }
  addHunting(code:string){
    const formData = this.huntingForm.value;
    const huntingDto = {
      "fishId": formData.fishId,
      "userId": formData.member,
      "weight": formData.weight
    }
    
    this.memberService.addHunting(huntingDto, code).subscribe({
      next: value => {
        this._toastService.success(value);
        this.getRanking(this.competitionId);
        this.huntingForm.reset();
      },
      error: err =>  {
        this._toastService.error(err.error)
        this.huntingForm.reset()        
      }

    })
  }
  
  getUserId(id: string | null){
    if(id != null){
      this.userId = +id;
    }
  }
  getCompetitionDetails(id: number){
    this.competitionService.competitionDetails(id).subscribe({ next: value => {
        this.competitionDetails = value.competitionDto
        this.competitionMember = value.memberDtoList;
        console.log(this.competitionMember);
        
      }
    });
  }

  getRanking(competitionId:number){
    console.log("err");
    
    this.competitionService.getTop3Members(this.competitionId).subscribe(response => {
      this.top3Members = response;
      console.log(this.top3Members);
      
    });
  }
}
