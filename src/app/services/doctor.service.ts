
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _baseUrl:string="http://localhost:8080/doctor/"

  constructor(private _http:HttpClient) { }

  //addAdmin
  insert(doctor):Observable<any>{
    return this._http.post(`${this._baseUrl}insert`,doctor)
  }

  //viewDoctor
  views():Observable<any>{
    return this._http.get(`${this._baseUrl}views`)
  }

  //checkAppointment removed
  view(id):Observable<any>{
    return this._http.get(`${this._baseUrl}view/${id}`)
  }

  //deleteDoctor
  delete(id):Observable<any>{
    return this._http.delete(`${this._baseUrl}delete/${id}`)
  }
  
  //updateDoctor
  update(id,doctor):Observable<any>{
    return this._http.patch(`${this._baseUrl}update/${id}`,doctor)
  }

  //userHome
  getSpecializations():Observable<any>{
    return this._http.get(`${this._baseUrl}specialization`)
  }

  //bookAppointment
  viewsSpecializaions(specialization){
    return this._http.get(`${this._baseUrl}specialization/${specialization}`)
  }
}
