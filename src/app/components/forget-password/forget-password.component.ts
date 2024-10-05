import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {


  forgetForm:FormGroup
  OTPForm:FormGroup
  resetForm:FormGroup
  user;
  username;
  action:string='forget';
  constructor(private _router:Router,private _sweetAlert:SweetAlertService,private _formBuilder:FormBuilder,private _userService:UserService){ }
  ngOnInit(){
    this.forgetForm=this._formBuilder.group({
      'id':[]
    })
    this.OTPForm=this._formBuilder.group({
      'otp':[]
    })
    this.resetForm=this._formBuilder.group({
      'password':[],
      'confirmPassword':[]
    })
  }

  forgetSubmit(){
    let id=this.forgetForm.get('id').value
    this._userService.forgetPassword(id).subscribe(res=>{
      if(res){
        this.user=res
        emailjs.init('7u8rtPDoPERkqWvyj')
        let response=emailjs.send("service_5eufwoc","template_lvqt8vm",{
          username: this.user.username,
          otp: this.user.otp,
          email: this.user.email,
          });
          this._sweetAlert.showInfo('Note','OTP sent to your email id : '+this.user.email)
        
        // alert('OTP sent to your email id : '+this.user.email)
        // this._sweetAlert.showSuccess('Received OTP','OTP to reset your password is '+this.user.otp)
        this.action='otp'
      }else{
        this._sweetAlert.showInfo('Error','No username or email')
      }
    })
  }

  OTPSubmit(){
    let otp=this.OTPForm.get('otp').value
    if(otp==this.user.otp){
      this.action='reset'
      this._sweetAlert.showInfo('Correct OTP','Set your passward')
    }else{
      this._sweetAlert.showInfo('Retry','Entered wrong OTP')
    }
   
  }

  resetSubmit(){
    let password=this.resetForm.get('password').value
    this.user.password=password
    this._userService.resetPassword(this.user).subscribe(res=>{
      if(res){
        this._sweetAlert.showSuccess('Success','Your password has been changed')
        this._router.navigateByUrl('/login')
      }else{
        this._sweetAlert.showFailed('Failed','Retry again')
      }
    })
  }
}
