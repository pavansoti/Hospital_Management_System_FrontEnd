import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AdminHomeComponent {
  username;
  action;
  images;
  constructor(private _route:ActivatedRoute,private _imageService:ImageService){  }
  
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
      this.action=param.get('action')
    })
    this.images=this._imageService.images
  }
}
