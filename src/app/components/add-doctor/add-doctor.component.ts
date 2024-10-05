import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {

  username;
  doctorForm:FormGroup;
  constructor(private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _doctorService:DoctorService,private _router:Router,private _route:ActivatedRoute) {
    this.doctorForm=_formBuilder.group({
      "name":[,[Validators.required,Validators.pattern(/^[a-zA-Z-' ]+$/)]],
      "specialization":[,[Validators.required]],
      "email":[,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      "contact":[,[Validators.required,Validators.pattern(/^\d{10}$/)]],
      "experience":[,[Validators.required,Validators.min(1),Validators.max(30),Validators.required]],
      "address":[,[Validators.required]],
      "dob":[,[Validators.required]]
    })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>
      this.username=param.get('username')
    )
  }
  
  submit(){
    if(this.doctorForm.valid){
      let name=this.doctorForm.get('name').value
      let specialization=this.doctorForm.get('specialization').value
      let email=this.doctorForm.get('email').value
      let contact=this.doctorForm.get('contact').value
      let experience=this.doctorForm.get('experience').value
      let address=this.doctorForm.get('address').value
      let dob=this.doctorForm.get('dob').value
      let doctor={
        "name":name,
        "specialization":specialization,
        "email":email,
        "contact":contact,
        "experience":experience,
        "address":address,
        "dob":dob
      }
      this._doctorService.insert(doctor).subscribe(res=>{
        if(res){
          this._sweetAlert.showSuccess('Success','Doctor details added')
          this._router.navigate(['/admin/'+this.username])
        }else{
          this._sweetAlert.showFailed('Retry again','Failed to add doctor details')
          this._router.navigate(['/admin/'+this.username+'/add_doctor'])
        }
      })
    }else{
      this._sweetAlert.showFailed('Failed','Invalid form')
    }
  }

  get name(){
    return this.doctorForm.get('name')
  }

  get specialization(){
    return this.doctorForm.get('specialization')
  }

  get email(){
    return this.doctorForm.get('email')
  }

  get mobile(){
    return this.doctorForm.get('contact')
  }

  get experience(){
    return this.doctorForm.get('experience')
  }

  get address(){
    return this.doctorForm.get('address')
  }

  get dob(){
    return this.doctorForm.get('dob')
  }
}
