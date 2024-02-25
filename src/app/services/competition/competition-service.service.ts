import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competition} from "../../pages/type/competition";
import {CompetitionDto} from "../../models/competition-dto.model";


@Injectable({
  providedIn: 'root'
})
export class CompetitionServiceService {
apiUrl:string = "http://localhost:8080/api/v1";
  competitionDtl!: any;
  competitionMembers!: any[];
  constructor(private http:HttpClient) { }

  getAllCompetitions(){
    return this.http.get(`${this.apiUrl}/competitions`);
  }

  getCompetitionByStatus(status:string){
    return this.http.get(`${this.apiUrl}/competitions/status?status=${status}`)
  }

  pageCompetition(currentPage:number, pageSize: number) {
    return this.http.get<any>(`${this.apiUrl}/competitions?page=${currentPage}&size=${pageSize}`)
  }

  createCompetition(competitionData: any): Observable<any> {
    const url = `${this.apiUrl}/competitions/create`;
    return this.http.post(url, competitionData, {responseType : 'text'});
  }

  addMemberToCompetition(competitionId:number,memberId:number):Observable<any>{
    const url = `${this.apiUrl}/member/${competitionId}/register/${memberId}`
    return this.http.post(url,competitionId, {responseType: 'text'})
  }

  getAllMember(){
    const url = `${this.apiUrl}/member`;
    return this.http.get(url);
  }

  startCompetition(content:any){
    return this.http.post(`${this.apiUrl}/competitions/start`, content)
  }
  
  getRanking(memberId: number):Observable<any> {
    return this.http.get(`${this.apiUrl}/competitions/rankings/${memberId}`)

  }

  competitionDetails(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/member/${id}`)

  }

  getTop3Members(competitionId: number | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/competitions/ranking/${competitionId}`);
  }

  getCompetitionsSubscription(memberId: number){
    return this.http.get<any>(`${this.apiUrl}/member/subscribtion?memberId=${memberId}`);

  }
 
}
