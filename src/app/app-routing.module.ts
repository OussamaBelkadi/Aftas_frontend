  import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashbordAdminComponent} from "./pages/dashbord-admin/dashbord-admin.component";
import {CompetitionDashbordComponent} from "./pages/competition-dashbord/competition-dashbord.component";
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { SignupAdminComponent } from './pages/signup-admin/signup-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ValidateAccountComponent } from './pages/admin/validate-account/validate-account.component';

const routes: Routes = [
  {path: 'admin/signup', component: SignupAdminComponent},
  {path: 'admin/login', component: LoginAdminComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'user/signup', component: SingupComponent},
  {path: '', component: DashbordAdminComponent},
  {path: 'admin/validation', component: ValidateAccountComponent},
  {path: 'competition/:competitionId', component: CompetitionDashbordComponent}
  // {path: '', loadChildren: () => import('./pages/dashbord-admin/dashbord-admin-routing.module').then((m)=>m.DashbordAdminRoutingModule)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
