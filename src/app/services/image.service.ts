import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  
  images=[
    {name:'img1.jpg'},
    {name:'i.jpg'},
    {name:'i2.jpg'}
  ]
}
