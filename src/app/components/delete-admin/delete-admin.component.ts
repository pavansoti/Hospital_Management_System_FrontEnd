import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css']
})
export class DeleteAdminComponent {

  username
  deleteForm:FormGroup
  constructor(private _formBuilder:FormBuilder,private _adminService:AdminService,private _sweetAlert:SweetAlertService,private _router:Router,private _route:ActivatedRoute){
    this.deleteForm=_formBuilder.group({
      'id':[]
    })
  }
  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.username=param.get('username')
    })
  }

  deleteSubmit(){
    let id=this.deleteForm.get('id').value
    if(id=='admin'||id=='admin@gmail.com'){
      this._sweetAlert.showFailed('Error','Main admin cannot be deleted')
    }else{
      this._adminService.delete(id).subscribe(res=>{
        if(res){
          this._sweetAlert.showSuccess('Success','Deleted admin : '+id)
          this._router.navigateByUrl('/admin/'+this.username)
        }else{
          this._sweetAlert.showInfo('Error','No admin for given username or email')
        }
      })
    }
  }
}
