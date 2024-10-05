import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-check-appointment',
  templateUrl: './check-appointment.component.html',
  styleUrls: ['./check-appointment.component.css']
})
export class CheckAppointmentComponent {
  username;
  displayForm:boolean=true;
  displayDetails:boolean=false;
  doctor;
  appointment;
  checkId:FormGroup
  constructor(private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _appointmentService:AppointmentService,private _doctorService:DoctorService,private _route:ActivatedRoute){
    this.checkId=this._formBuilder.group({
      "id":[]
    })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>this.username=param.get('username'))
  }

  submit(){
    let id=this.checkId.get('id').value
    this._appointmentService.viewId(id).subscribe(res=>{
      if(res){
        this.appointment=res
        this.displayForm=false;
        this.displayDetails=true;
      }else{
        this._sweetAlert.showInfo('Error','No appointment for id : '+id)
      }
    })
  }
  status(id){
    this._appointmentService.updateStatus(id,'closed').subscribe(res=>{
      if(res)
        this._sweetAlert.showSuccess('Succcess','Checked in')
      else  
        this._sweetAlert.showFailed('Failed','Retry again')
    })
  }
}
