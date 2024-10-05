import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;
  constructor(private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _userService:UserService,private _adminService:AdminService,private _router:Router){
    this.loginForm=_formBuilder.group({
      "username":[],
      "password":[],
      "type":['users']
    })
  }
  submit():void{
    if(this.loginForm.valid){
      let username:string=this.loginForm.get('username').value
      let type:string=this.loginForm.get('type').value
      let password:string=(this.loginForm.get('password')).value
      if(type=='users'){
        let user={
          "username":username,
          "email":"",
          "password":password
        }
        this._userService.confirmUser(user).subscribe(res=>{
          if(res!=null){
            this._sweetAlert.showSuccess('Success','Logged in')
            this._router.navigate(['/user',username])
          }else{
            this._sweetAlert.showFailed('Failed','Incorrect username or password')
            this._router.navigate(['/login'])
          }
        })
      }else if(type=='admins'){
        let admin={
          "username":username,
          "email":"",
          "password":password
        }
        this._adminService.confirmAdmin(admin).subscribe(res=>{
          if(res){
            this._sweetAlert.showSuccess('Success','Logged in')
            this._router.navigate(['/admin',username])
          }else{
            this._sweetAlert.showFailed('Failed','Incorrect username or password')
            this._router.navigate(['/login'])
          }
        })
      }
    }else{
      this._sweetAlert.showFailed('Failed','Invalid form')
    }
  }
}
