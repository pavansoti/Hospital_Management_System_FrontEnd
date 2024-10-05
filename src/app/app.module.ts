import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AllAppointmentsComponent } from './components/all-appointments/all-appointments.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ViewDoctorComponent } from './components/view-doctor/view-doctor.component';
import { ViewAppointmentComponent } from './components/view-appointment/view-appointment.component';
import { CheckAppointmentComponent } from './components/check-appointment/check-appointment.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { UpdateDoctorComponent } from './components/update-doctor/update-doctor.component';
import { DeleteDoctorComponent } from './components/delete-doctor/delete-doctor.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AdminPasswordChangeComponent } from './components/admin-password-change/admin-password-change.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DeleteAdminComponent } from './components/delete-admin/delete-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    AboutComponent,
    AdminHomeComponent,
    UserHomeComponent,
    AllAppointmentsComponent,
    BookAppointmentComponent,
    FeedbackComponent,
    ChangePasswordComponent,
    AddDoctorComponent,
    ViewDoctorComponent,
    ViewAppointmentComponent,
    CheckAppointmentComponent,
    AddAdminComponent,
    UpdateDoctorComponent,
    DeleteDoctorComponent,
    AddPatientComponent,
    AdminPasswordChangeComponent,
    ForgetPasswordComponent,
    DeleteAdminComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
