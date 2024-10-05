import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  username;
  id;
  patientForm:FormGroup;
  constructor(private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _appointmentService:AppointmentService,private _router:Router,private _route:ActivatedRoute) {
    this.patientForm=_formBuilder.group({
      "name":[,[Validators.required,Validators.pattern(/^[a-zA-Z-' ]+$/)]],
      "gender":[],
      "age":[,[Validators.required,Validators.min(0),Validators.max(100),Validators.required]],
      "mobile":[,[Validators.required,Validators.pattern(/^\d{10}$/)]],
      "address":[],
      "appointmentDate":[]
    })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
      this.id=param.get('id')
    })
  }

  submit(){
    if(this.patientForm.valid){
      let name=this.patientForm.get('name').value
      let gender=this.patientForm.get('gender').value
      let age=this.patientForm.get('age').value
      let mobile=this.patientForm.get('mobile').value
      let address=this.patientForm.get('address').value
      let appointmentDate=this.patientForm.get('appointmentDate').value
      let patient={
        "doctorId":{"id":this.id},
        "username":this.username,
        "name":name,
        "gender":gender,
        "age":age,
        "mobile":mobile,
        "address":address,
        "appointmentDate":appointmentDate,
        "status":"open"
      }
      this._appointmentService.insert(patient).subscribe(res=>{
        if(res){
          this._sweetAlert.showSuccess('Success','Appointment fixed with an id : '+res.id)
          this._router.navigate(['/user/'+this.username])
        }else{
          this._sweetAlert.showFailed('Retry again','Failed to add doctor details')
          this._router.navigate(['/user/'+this.username+'/book/'+this.id])
        }
      })
    }else{
      this._sweetAlert.showFailed('Failed','Invalid form')
    }
  }

  get name(){
    return this.patientForm.get('name')
  }

  get age(){
    return this.patientForm.get('age')
  }

  get mobile(){
    return this.patientForm.get('mobile')
  }

  get address(){
    return this.patientForm.get('address')
  }

  get appointmentDate(){
    return this.patientForm.get('appointmentDate')
  }
  
}
