import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {

  username;
  adminForm:FormGroup
  constructor(private _adminService:AdminService,private _formBuilder:FormBuilder,private _router:Router,private _route:ActivatedRoute,private _sweetAlert:SweetAlertService){
    this.adminForm=_formBuilder.group({
      "username":[,[Validators.required,Validators.minLength(4),Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
      "email":[,[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      "password":[,[Validators.required,Validators.minLength(8)]],
      "confirmPassword":[]
    })
  }

  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
  }
  submit(){
    if(this.adminForm.valid){
      let username:string=this.adminForm.get('username').value
      let email:string=this.adminForm.get('email').value
      let password:string=(this.adminForm.get('password')).value
      let admin={
        "username":username,
        "email":email,
        "password":password
      }
      this._adminService.insert(admin).subscribe(res=>{
        if(res=='1'){
          this._sweetAlert.showInfo('Note','Username already exists')
          this._router.navigate(['/admin/'+this.username+'/add_admin'])
        }else if(res=='2'){
          this._sweetAlert.showInfo('Note','Email already exists')
          this._router.navigate(['/admin/'+this.username+'/add_admin']) 
        }else if(res=='3'){
          this._sweetAlert.showSuccess('Success','Added new admin')
          this._router.navigate(['/admin/'+this.username])
        }
      })
    }else{
      this._sweetAlert.showFailed('Failed','Invalid form')
    }
  }

  get usernameCheckSpace(){
    let username=this.adminForm.get('username').value
    for(let i=0;i<username.length;i++){
      if(username.charAt(i)==' '){
        return true
      }
    }
    return false
  }

  get usernameCheckStart(){
    let username=this.adminForm.get('username').value
    if(username.length){
      if((username.charAt(0)>='a'&& username.charAt(0)<='z') || (username.charAt(0)>='A'&& username.charAt(0)<='Z')){
        return false
      }else{
        return true
      }
    }
    return false
  }

  get usernameAdmin(){
    return this.adminForm.get('username')
  }

  get email(){
    return this.adminForm.get('email')
  }

  get password(){
    return this.adminForm.get('password')
  }

  get confirmPassword(){
    return this.adminForm.get('confirmPassword')
  }  
}
