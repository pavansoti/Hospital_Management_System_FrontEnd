import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent {

  day
  action
  username
  appointments
  date
  constructor(private _appointmentService:AppointmentService,private _route:ActivatedRoute){  }

  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.action=param.get('action')
      this.username=param.get('username')
      this.day=param.get('day')
      if(this.day=='custom'){
        
      }else if(this.day){
        this._appointmentService.viewsAppointmentDate(this.calculateDate(this.day)).subscribe(res=>{
          this.appointments=res
        })
      }else{
        this._appointmentService.viewAll().subscribe(res=>this.appointments=res)
      }
    })

    
  }

  search={
    'date':''
  }
  submit(dateSearch:NgForm){
    this._appointmentService.viewsAppointmentDate(dateSearch.value.date).subscribe(res=>{
      this.appointments=res
    })
    this.day='customEnd'
  }

  calculateDate(filter): string{
    let date:Date=new Date()
    let year=String(date.getFullYear())
    let day=String(date.getDate())
    let month=String(date.getMonth()+1)
    if(month.length==1){
      month='0'+month
    }
    if(filter=='today'){ 
      if(day.length==1){
        day='0'+day
      }
      return `${year}-${month}-${day}`
    }else if(filter=='tomorrow'){
      day=String(date.getDate()+1)
      if(day.length==1){
        day='0'+day
      }
      return `${year}-${month}-${day}`
    }else if(filter=='yesterday'){
      day=String(date.getDate()-1)
      if(day.length==1){
        day='0'+day
      }
      return `${year}-${month}-${day}`
    }
  }


}
