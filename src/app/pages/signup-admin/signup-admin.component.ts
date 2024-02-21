import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { User } from 'src/app/models/user/user.module';
import { AuthenticationService } from 'src/app/services/authentes/authentication.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent {
  constructor(private fb: FormBuilder, private route: Router, private service: AuthenticationService, private toast: ToastService){
  }
  SignupForm!: FormGroup;
  user!: User;



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
      
      this.service.registerAdmin(this.user).subscribe((data : any)=>{

        console.log(data);
        this.toast.success("register success");
        this.route.navigate(['/admin/login']);
      },(err)=>{

        console.log(err);
      })

    }
  }
}
