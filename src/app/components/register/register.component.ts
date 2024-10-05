import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm:FormGroup;
  constructor(private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _userService:UserService,private _router:Router){
    this.userForm=_formBuilder.group({
      "username":[,[Validators.minLength(4),Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/)]],
      "email":[,[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      "password":[,Validators.minLength(8)],
      "confirmPassword":[]
    })
  }
  submit():void{
    if(this.userForm.valid){
      let username:string=this.userForm.get('username').value
      let email:string=this.userForm.get('email').value
      let password:string=(this.userForm.get('password')).value
      let user={
        "username":username,
        "email":email,
        "password":password
      }
      this._userService.insert(this.userForm.value).subscribe(res=>{
        if(res=='1'){
          this._sweetAlert.showInfo('Note','Username already exists')
          this._router.navigateByUrl('/register')
        }else if(res=='2'){
          this._sweetAlert.showInfo('Note','Email already exists')
          this._router.navigateByUrl('/register')
        }else if(res=='3'){
          this._sweetAlert.showSuccess('Success','User registered')
          this._router.navigateByUrl('/')
        }
      })
    }else{
      this._sweetAlert.showFailed('Failed','Invalid form')
    }
  }

  get usernameCheckSpace(){
    let username=this.userForm.get('username').value
    for(let i=0;i<username.length;i++){
      if(username.charAt(i)==' '){
        return true
      }
    }
    return false
  }

  get usernameCheckStart(){
    let username=this.userForm.get('username').value
    if(username.length){
      if((username.charAt(0)>='a'&& username.charAt(0)<='z') || (username.charAt(0)>='A'&& username.charAt(0)<='Z')){
        return false
      }else{
        return true
      }
    }
    return false
  }

  get username(){
    return this.userForm.get('username')
  }

  get email(){
    return this.userForm.get('email')
  }

  get password(){
    return this.userForm.get('password')
  }

  get confirmPassword(){
    return this.userForm.get('confirmPassword')
  }
}
