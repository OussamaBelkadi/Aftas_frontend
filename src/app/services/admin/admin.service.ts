import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validateAccountDto } from 'src/app/models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "http://localhost:8080/api/v1"
  constructor(private http: HttpClient) { }

  getListValidationAccount(status: string){
    return this.http.get(`${this.url}/admin/list/user?status=${status}`)
  }

  approvedRefusedAccount(requestValidation: validateAccountDto){
    return this.http.post(`${this.url}/admin/validate`, requestValidation, {responseType: "text"})
  }
}
