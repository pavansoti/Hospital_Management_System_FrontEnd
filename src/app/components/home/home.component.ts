import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _images:ImageService){}
  images=this._images.images
}
