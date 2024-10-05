import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  
})
export class ChangePasswordComponent {

  user
  username
  changeForm:FormGroup;
  constructor(private _router:Router,private _route:ActivatedRoute,private _formBuilder:FormBuilder,private _userService:UserService,private _sweetAlertService:SweetAlertService){
    this.changeForm=this._formBuilder.group({
        "oldPassword":[],
        "newPassword":[,[Validators.required,Validators.minLength(8)]]
      })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
  }
  submit(){
      let oldPassword=this.changeForm.get('oldPassword').value
      let newPassword=this.changeForm.get('newPassword').value
      let user={
        "username":this.username,
        "gmail":"",
        "password":oldPassword
      }
      this._userService.changePassword(user,newPassword).subscribe(res=>{
        if(res!=null){
          this._sweetAlertService.showSuccess('Success','Password changed')
          this._router.navigate(['/login'])
        }else{
          this._sweetAlertService.showFailed('Failed','Incorrect old password')
          this._router.navigate(['/user',this.username,'/change'])
        }
      })
  }

  get newPassword(){
    return this.changeForm.get('newPassword')
  }
}
