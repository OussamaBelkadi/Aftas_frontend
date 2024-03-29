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
  pageCompetition(currentPage:number, pageSize: number) {
    return this.http.get<any>(`${this.apiUrl}/competitions?page=${currentPage}&size=${pageSize}`)
  }
  createCompetition(competitionData: any): Observable<any> {
    const url = `${this.apiUrl}/competitions/create`;
    return this.http.post<any>(url, competitionData);
  }
  addMemberToCompetition(competitionId:number,memberId:number):Observable<any>{
    const url = `${this.apiUrl}/member/${competitionId}/register/${memberId}`
    return this.http.post(url,competitionId)
  }
  getAllMember(){
    const url = `${this.apiUrl}/member`;
    return this.http.get(url);
  }
  startCompetition(content:any){
    return this.http.post(`${this.apiUrl}/competitions/start`, content)
  }

  competitionDetails(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/member/${id}`)

  }
  getTop3Members(competitionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/competitions/ranking/${competitionId}`);
  }
}
