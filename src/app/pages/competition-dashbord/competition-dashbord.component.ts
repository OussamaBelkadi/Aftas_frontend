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
  competitionDetails: any;
  competitionMember: any;
  competitionId!: number;
  id!:number;
  top3Members: any[] = [];
  constructor(private competitionService: CompetitionServiceService, private memberService: MemberServiceService, private route: ActivatedRoute, private _toastService: ToastService, private form:FormBuilder) {
    this.initForm()
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
      "memberId": formData.member,
      "weight": formData.weight
    }
    this.memberService.addHunting(huntingDto, code).subscribe({
      next: value => {

        this._toastService.success('value.text')

      },
      error: err =>  {
        if (err.error == 'the fish is not in average weight !'){
          this._toastService.error(err.error);
          this.getRanking(this.competitionId);


        }else {
          this._toastService.success('the hunting added successfully');
          this.getRanking(this.competitionId);

        }
      }

    })
  }
  ngOnInit() {
    this.getFish();
    this.route.params.subscribe(params => {
      this.competitionId = parseInt(params['competitionId']);
      this.getCompetitionDetails(this.competitionId);
      this.getRanking(this.competitionId);
    });
  }
  getCompetitionDetails(id: number){
    this.competitionService.competitionDetails(id).subscribe({ next: value => {
        this.competitionDetails = value.competitionDto
        this.competitionMember = value.memberDtoList;
      }
    });
  }

  getRanking(competitionId:number){
    this.competitionService.getTop3Members(competitionId).subscribe(response => {
      this.top3Members = response;
    });
  }
}
