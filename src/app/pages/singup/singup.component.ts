import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { User } from 'src/app/models/user/user.module';
import { AuthenticationService } from 'src/app/services/authentes/authentication.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{
  constructor(private fb: FormBuilder, private service: AuthenticationService, private toast: ToastService){
  }
  SignupForm!: FormGroup;
  user!: User



  ngOnInit(): void {
      this.SignupForm = this.fb.group({

        name: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        address: ["", Validators.required],
        roles: [""],

      })
  }

  Submit(){
    
    if(this.SignupForm.valid){
      const  {name,email,password, address,roles} = this.SignupForm.value;
      const formData = new FormData();
      this.user = {
        name,email,password,address,roles
      }
      
      this.service.registerUser(this.user).subscribe((data : any)=>{
        this.SignupForm.reset()
        this.toast.success("register success")
      },(err)=>{

        console.log(err);
      })

    }
  }
}
