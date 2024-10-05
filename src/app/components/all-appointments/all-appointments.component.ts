import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent {

  username;
  myAppointments
  constructor(private _sweetAlert:SweetAlertService,private _appointmentService:AppointmentService,private _route:ActivatedRoute,private _doctorService:DoctorService){}

  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
    this._appointmentService.views(this.username).subscribe(res=>this.myAppointments=res)
  }

  status(id){
    this._appointmentService.updateStatus(id,'cancel').subscribe(res=>{
      if(res)
        this._sweetAlert.showSuccess('Success','Appointment cancelled for id : '+id)
      else 
        this._sweetAlert.showFailed('Failed','Retry again')
    })
  }
}
