import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, loginRequest } from 'src/app/models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = "http://localhost:8080" 
  constructor(private http: HttpClient) { }

  registerUser(user: User){
    return this.http.post(`${this.url}/api/v1/user/signup`, user);
  }
  registerAdmin(user: User){
    return this.http.post(`${this.url}/api/v1/adminauth/Signup`, user)
  }
  loginAdmin(user: loginRequest){
    return this.http.post(`${this.url}/api/v1/adminauth/login`, user)
  }
}
