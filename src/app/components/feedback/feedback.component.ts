import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  username;
  email;
  feedbackForm:FormGroup
  constructor(private _router:Router,private _sweetAlert:SweetAlertService,private _route:ActivatedRoute,private _userService:UserService,private _formBuilder:FormBuilder){}

  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
    this._userService.view(this.username).subscribe(res=>{
      if(res==null)
        this._sweetAlert.showInfo('Error','Retry again')
      else this.email=res.email
    })

    this.feedbackForm=this._formBuilder.group({
      'username':[this.username],
      'email':[this.email],
      'type':[,[Validators.required]],
      'subject':[,[Validators.required]],
      'description':[,[Validators.required]]
    })
  }

 async submit(){
   if(this.feedbackForm.valid){
    emailjs.init('7u8rtPDoPERkqWvyj')
    //email
    let res=await emailjs.send("service_5eufwoc","template_f503xxn",{
      subject: this.feedbackForm.value.subject,
      type: this.feedbackForm.value.type,
      description: this.feedbackForm.value.description,
      email: this.email,
      username: this.username,
      });
      this._sweetAlert.showSuccess('Success','Feedback sent')
      this._router.navigateByUrl('/user/'+this.username)
   }else{
    this._sweetAlert.showFailed('Failed','Invalid form')
   }
  }

  get type(){
    return this.feedbackForm.get('type')
  }

  get subject(){
    return this.feedbackForm.get('subject')
  }

  get description(){
    return this.feedbackForm.get('description')
  }
}
