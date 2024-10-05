import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent {
  
  username;
  id;
  constructor(private _sweetAlert:SweetAlertService,private _router:Router,private _route:ActivatedRoute,private _doctorService:DoctorService){
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.id=param.get('id')
      this.username=param.get('username')
    })
    this._doctorService.delete(this.id).subscribe(res=>{
      if(res){
          this._sweetAlert.showSuccess('Success','Deleted doctor details')
          this._router.navigate(['/admin/'+this.username+'/view_doctor'])
      }else{
        this._router.navigate(['/admin/'+this.username+'/view_doctor'])
      }
    })
    
  }

}
