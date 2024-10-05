import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-admin-password-change',
  templateUrl: './admin-password-change.component.html',
  styleUrls: ['./admin-password-change.component.css']
})
export class AdminPasswordChangeComponent {
  username
  changeForm:FormGroup;
  constructor(private _sweetAlert:SweetAlertService,private _router:Router,private _route:ActivatedRoute,private _formBuilder:FormBuilder,private _adminService:AdminService){
    this.changeForm=this._formBuilder.group(
      {
        "oldPassword":[],
        "newPassword":[,[Validators.required,Validators.minLength(8)]]
      }
    )
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
  }

  submit(){
    let oldPassword=this.changeForm.get('oldPassword').value
    let newPassword=this.changeForm.get('newPassword').value
    let admin={
      "username":this.username,
      "gmail":"",
      "password":oldPassword
    }
    this._adminService.changePassword(admin,newPassword).subscribe(res=>{
      if(res!=null){
        this._sweetAlert.showSuccess('Success','Password changed')
        this._router.navigate(['/login'])
      }else{
        this._sweetAlert.showFailed('Failed','Incorrect old password')
        this._router.navigate(['/admin',this.username,'/change'])
      }
    })
  }

  get newPassword(){
    return this.changeForm.get('newPassword')
  }
}
