import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UpdateDoctorComponent } from './components/update-doctor/update-doctor.component';
import { DeleteDoctorComponent } from './components/delete-doctor/delete-doctor.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/home",
    pathMatch:"full"
  },{
    path:"home",
    component:HomeComponent
  },{
    path:"register",
    component:RegisterComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"forget_password",
    component:ForgetPasswordComponent
  },{
    path:"about",
    component:AboutComponent
  },{
    path:"user/:username",
    component:UserHomeComponent
  },{
    path:"user/:username/:action",
    component:UserHomeComponent
  },{
    path:"user/:username/fix/:id",
    component:AddPatientComponent
  },{
    path:"user/:username/:action/:specialization",
    component:UserHomeComponent
  },{
    path:"admin/:username",
    component:AdminHomeComponent
  },{
    path:"admin/:username/:action",
    component:AdminHomeComponent
  },{
    path:"admin/:username/update/:id",
    component:UpdateDoctorComponent
  },{
    path:"admin/:username/view_doctor/:id",
    component:DeleteDoctorComponent
  },{
    path:"admin/:username/:action/:day",
    component:AdminHomeComponent
  },{
    path:"**",
    component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
