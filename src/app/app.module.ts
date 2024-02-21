import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashbordAdminComponent } from './pages/dashbord-admin/dashbord-admin.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MemberComponent } from './pages/member/member.component';
import { PopupComponent } from './pages/popup/popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewPopComponent } from './fragments/view-pop/view-pop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularToastifyModule, ToastService} from "angular-toastify";
import { CompetitionDashbordComponent } from './pages/competition-dashbord/competition-dashbord.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { SignupAdminComponent } from './pages/signup-admin/signup-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ValidateAccountComponent } from './pages/admin/validate-account/validate-account.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashbordAdminComponent,
    SidebarComponent,
    MemberComponent,
    PopupComponent,
    ViewPopComponent,
    CompetitionDashbordComponent,
    LoginComponent,
    SingupComponent,
    SignupAdminComponent,
    LoginAdminComponent,
    ValidateAccountComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularToastifyModule,
        FormsModule
    ],
  providers: [ToastService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
