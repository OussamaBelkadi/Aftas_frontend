import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  apiUrl:string = "http://localhost:8080/api/v1";

  constructor(private http:HttpClient) { }

  createMember(competitionData: any): Observable<any> {
    const url = `${this.apiUrl}/member/register`;
    return this.http.post<any>(url, competitionData);
  }
  addHunting(hunting: any, code: string):Observable<any>{
    const url = `${this.apiUrl}/competition/hunting/${code}`;
    return this.http.post(url, hunting, {responseType: "text"})

  }
  getFish(){
    const url = `${this.apiUrl}/fishs`
    return this.http.get(url);
  }

}
