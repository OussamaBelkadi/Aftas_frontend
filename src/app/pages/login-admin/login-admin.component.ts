import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { loginRequest } from 'src/app/models/user/user.module';
import { AuthenticationService } from 'src/app/services/authentes/authentication.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{
    constructor(private fb: FormBuilder,  private route: Router, private service: AuthenticationService, private toast: ToastService){}

    LoginForm!: FormGroup;
    loginRequest!: loginRequest;

    ngOnInit(): void {
        this.LoginForm = this.fb.group({
          email: ["", Validators.required],
          password: ["", Validators.required],
        })
    }

    onSubmit(){
      console.log("os");
      
      if(this.LoginForm.valid){
      console.log("os 1");

        const  {email,password} = this.LoginForm.value;
        const formData = new FormData();
        this.loginRequest = {
          email,password
        }
        
        this.service.loginAdmin(this.loginRequest).subscribe((data : any)=>{
          this.toast.success("Login success");
          localStorage.setItem("token", data.token);
          localStorage.removeItem("admId");
          localStorage.setItem("admId", data.id)
          this.route.navigate(['admin/validation'])
        },(err)=>{
          this.toast.error("Verify the credential data is invalid");

        })
  
      }
    }

}
