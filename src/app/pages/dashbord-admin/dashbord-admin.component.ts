import {Component, OnInit} from '@angular/core';
import {CompetitionServiceService} from "../../services/competition/competition-service.service";
import {catchError, pipe, throwError} from "rxjs";
import {Competition} from "../type/competition";
import {ApiResponse} from "../../dataTypes/ApiResponse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "angular-toastify";
import {CompetitionDto} from "../../models/competition-dto.model";
import {MemberDto} from "../../models/memberDto";
import {MemberServiceService} from "../../services/member/member-service.service";


@Component({
  selector: 'app-dashbord-admin',
  templateUrl: './dashbord-admin.component.html',
  styleUrls: ['./dashbord-admin.component.css']
})
export class DashbordAdminComponent implements OnInit{
  competitions!:Array<any>;
  competitionForm!:FormGroup;
  memberForm!:FormGroup;
  competition!:Competition;
  competitionMember!:FormGroup;
  members!: any
  private requestBody:any;
  currentPage = 0;
  pageSize = 10;


  constructor(private competitionService:CompetitionServiceService, private memberService:MemberServiceService, private formBuilder: FormBuilder, private _toastService: ToastService) {
    this.createForm();
   }
createForm() {

  this.competitionForm = this.formBuilder.group({
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    location: ['', Validators.required],
    amount: ['', Validators.required],
  });
  this.memberForm = this.formBuilder.group({
    name: ['', Validators.required],
    familyName: ['', Validators.required],
    identityDocumentType: ['', Validators.required],
    identityNumber: ['', Validators.required],
    nationality: ['', Validators.required],
  });
  this.competitionMember = this.formBuilder.group({
    competitionId: [''],
    memberId: [''],
  })
}
  ngOnInit() {
    this.loadCompetitions();
    this.getAllMember();
  }

   generateCode(location: string, date: string): string {
    const [year, month, day] = date.split('-');

    const formattedMonth = ('0' + month).slice(-2);
    const formattedDay = ('0' + day).slice(-2);

    const locationCode = location.substring(0, 2).toLowerCase();

    const code = `${locationCode}-${formattedMonth}-${formattedDay}`;

    return code;
  }

  createMember(){
    const formData = this.memberForm.value;
    const memberDto: MemberDto ={
      name: formData.name,
      familyName:  formData.familyName,
      password: 'test',
      nationality: formData.nationality,
      identityDocumentType: formData.identityDocumentType,
      identityNumber: formData.identityNumber,
    }
    this.memberService.createMember(memberDto).pipe().subscribe({
      next: response => {
        this._toastService.success('Member created successfully')
        this.competitionForm.reset();
      },
      error: err => {
        // console.error('Error creating member:', err);
      }
    })
  }

  createCompetition() {
    const formData = this.competitionForm.value

    const competitionFormData: CompetitionDto = {
      code: this.generateCode(formData.location, formData.date),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      numberOfParticipants: 0,
      location: formData.location,
      status: 'is started',
      amount: formData.amount
    };
      this.competitionService.createCompetition(competitionFormData).subscribe({
        next: response => {
          this.competitionForm.reset();
        },
        error: err => {
          this.competitionForm.reset();
          this._toastService.success(err.error.text)
        }
      });
  }

  subMemberToCompetion(){
    const formData = this.competitionMember.value;
    this.competitionService.addMemberToCompetition(formData.competitionId, formData.memberId).subscribe({
      next: value => {
        console.log(value)
      },error: err =>  {
        if (err.error == 'the member is already registered'){
          this._toastService.success(err.error);
          this.loadCompetitions();

        }if (err.error == 'The subscribe should be 24h before start date competition'){
          this._toastService.error(err.error);
        }
        else {
          this._toastService.error(err.error);
            console.log(err.error)

        }
      }
    })
  }
  getAllMember(){
    this.competitionService.getAllMember().subscribe({
     
      
      next: response=>{
        this.members = response
        console.log(response);
      }
    })
  }
  getAllCompetition(){
    this.competitionService.getAllCompetitions().subscribe({
        next: response => {
          this.competitions = (response as ApiResponse).content;
        }
      }
    )
  }
  loadCompetitions(): void {
    this.competitionService.pageCompetition(this.currentPage, this.pageSize).subscribe((response) => {
      console.log(response)
        this.competitions = response.content;
      });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCompetitions();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCompetitions();
    }
  }

  startCompetition(content:any){
    this.requestBody = {
      'code': content.code,
      'status': 'is started'
    }
    this.competitionService.startCompetition(content).pipe(
      catchError((error) => {
        // Handle the error here
        console.error(error.error);
        return throwError(error);
      })
    ).subscribe({
        next: value => {
          console.log(value)

        },
        error: err =>   this._toastService.error(err.error)

      }
    )
  }

}
