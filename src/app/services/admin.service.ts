import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private _baseUrl:string="http://localhost:8080/admin/"
  constructor(private _http:HttpClient) { }


  //login
  confirmAdmin(admin):Observable<any>{
    return this._http.post(`${this._baseUrl}login`,admin)
  }
  
  //addAdmin
  insert(admin):Observable<any>{
    return this._http.post(`${this._baseUrl}insert`,admin)
  }

  //adminPasswordChange
  changePassword(admin,newPassword):Observable<any>{
    return this._http.put(`${this._baseUrl}change/${newPassword}`,admin)
  }

  //deleteAdmin
  delete(id):Observable<any>{//username or password
    return this._http.delete(`${this._baseUrl}delete/${id}`)
  }
}
