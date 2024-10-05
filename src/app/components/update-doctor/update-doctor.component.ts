import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent {

  username
  id
  doctor;
  editDoctorForm:FormGroup;
  constructor(private _router:Router,private _sweetAlertService: SweetAlertService, private _route:ActivatedRoute,private _formBuilder:FormBuilder,private _doctorService:DoctorService){
    this._route.paramMap.subscribe(param=>{
      this.id=param.get('id')
      this.username=param.get('username')
    })
    this._doctorService.view(this.id).subscribe(res=>{
      this.doctor=res
    }
    )
    this.editDoctorForm=this._formBuilder.group({
      "name":[,[Validators.pattern(/^[a-zA-Z-' ]+$/)]],
      "specialization":[],
      "email":[,[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      "contact":[,[Validators.pattern(/^\d{10}$/)]],
      "experience":[,[Validators.min(1),Validators.max(30),Validators.required]],
      "address":[],
      "dob":[]
    })
  }
  ngOnInit(){
    this._sweetAlertService.showInfo('Note','Fill only the fields you want to update')
  }

  submit(){
    let name=this.editDoctorForm.get('name').value
      let specialization=this.editDoctorForm.get('specialization').value
      let email=this.editDoctorForm.get('email').value
      let contact=this.editDoctorForm.get('contact').value
      let experience=this.editDoctorForm.get('experience').value
      let address=this.editDoctorForm.get('address').value
      let dob=this.editDoctorForm.get('dob').value
      if(name==null&&specialization==null&&email==null&&contact==null&&experience==null&&address==null&&dob==null){
        this._sweetAlertService.showInfo('Required data','Please enter atleast one feild to update')
        this._router.navigate(['/admin/'+this.username+'/update/'+this.id])
        return
      }
      let doctor={
        "id":this.id,
        "name":name,
        "specialization":specialization,
        "email":email,
        "contact":contact,
        "experience":experience,
        "address":address,
        "dob":dob
      }
        this._doctorService.update(this.id,doctor).subscribe(res=>{
          if(res){
            this._sweetAlertService.showSuccess('Successfully Updated','Doctor details has been updated for id : '+this.id)
            this._router.navigateByUrl('/admin/'+this.username+'/view_doctor')
          }else{
            this._sweetAlertService.showFailed('Update Failed','Retry Again')
          }
      })
  }

  get name(){
    return this.editDoctorForm.get('name')
  }

  get email(){
    return this.editDoctorForm.get('email')
  }

  get mobile(){
    return this.editDoctorForm.get('contact')
  }

  get experience(){
    return this.editDoctorForm.get('experience')
  }
}
