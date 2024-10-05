import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent {
[x: string]: any;

  username;
  doctors;
  constructor(private _doctorService:DoctorService,private _route:ActivatedRoute) {
    
  }
  ngOnInit(){
    this._doctorService.views().subscribe(res=>this.doctors=res.filter(doctor=>doctor.status=='active'))
    this._route.paramMap.subscribe(param=>
      this.username=param.get('username')
    )
  }
}
