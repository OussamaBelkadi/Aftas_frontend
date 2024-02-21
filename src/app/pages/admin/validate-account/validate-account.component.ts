import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { User, UserResponse, validateAccountDto } from 'src/app/models/user/user.module';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit{
  users!: UserResponse[];
  status!: string
  requestValidation: validateAccountDto = {
    userEmail: '',
    valid: false
  };

  constructor(private toasty: ToastService, private adminService: AdminService){
  }

  ngOnInit(): void {
    this.fetchDemandValidation();
  }

  fetchDemandValidation(){
    
    this.adminService.getListValidationAccount("JURY")
        .subscribe((data : any)=>{
            this.users = data;
        } )
  }

  ListAccountByStatus(status: string){
    this.adminService.getListValidationAccount(status)
    .subscribe((data : any)=>{
        this.users = data;
    } )
  }

  approved(email: string){ 
    this.requestValidation.valid = true;
    this.requestValidation.userEmail = email
    this.adminService.approvedRefusedAccount(this.requestValidation)
        .subscribe((data : any)=>{
          this.toasty.success(data)
          this.fetchDemandValidation();

        } )
  }
  refused(email: string){
    this.requestValidation.valid = false;
    this.requestValidation.userEmail = email
    this.adminService.approvedRefusedAccount(this.requestValidation)
        .subscribe((data : any)=>{
          this.toasty.success(data)
          this.fetchDemandValidation();

        } )
  }
}
