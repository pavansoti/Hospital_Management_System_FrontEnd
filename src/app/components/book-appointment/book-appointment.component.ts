import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {

  username;
  doctors;
  specialization;
  constructor(private _doctorService:DoctorService,private _route:ActivatedRoute) {
    
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
      this.specialization=param.get('specialization')
      if(this.specialization){
        this._doctorService.viewsSpecializaions(this.specialization).subscribe(res=>this.doctors=res)
      }
      else{
        this._doctorService.views().subscribe(res=>this.doctors=res) 
      }
    })
  }
}
