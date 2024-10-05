import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private _baseUrl:string="http://localhost:8080/appointment/"
  constructor(private _http:HttpClient) { }

  //addPatient
  insert(patient):Observable<any>{
    return this._http.post(`${this._baseUrl}insert`,patient)
  }

  //viewAppointment
  viewAll():Observable<any>{
    return this._http.get(`${this._baseUrl}views`)
  }

  //allAppointment
  views(username):Observable<any>{
    return this._http.get(`${this._baseUrl}views/${username}`)
  }

  //checkAppointment
  viewId(id):Observable<any>{
    return this._http.get(`${this._baseUrl}view/${id}`)
  }

  //checkAppointment
  //allAppointment
  updateStatus(id,status):Observable<any>{
    return this._http.get(`${this._baseUrl}update_status/${id}/${status}`)
  }

  //viewAppointmnet
  viewsAppointmentDate(date):Observable<any>{
    return this._http.get(`${this._baseUrl}views_date/${date}`)
  }
}
