import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {

  username;
  action;
  images;
  specializations
  constructor(private _route:ActivatedRoute,private _imageService:ImageService,private _doctorService:DoctorService){}

  ngOnInit(){
    this._route.paramMap.subscribe(params=>{
      this.username=params.get('username')
      this.action=params.get('action')
      if(this.action=='book'){
        this._doctorService.getSpecializations().subscribe(res=>{
          this.specializations=res
        })
      }
    })
    this.images=this._imageService.images
  }
}
