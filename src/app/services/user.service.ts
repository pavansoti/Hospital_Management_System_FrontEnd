import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl:string="http://localhost:8080/user/"
  constructor(private _http:HttpClient) { }

  //register
  insert(user:User):Observable<User>{
    return this._http.post(`${this._baseUrl}insert`,user)
  }

  views():Observable<any>{
    return this._http.get(`${this._baseUrl}views`)
  }

  //login
  confirmUser(user:User):Observable<User>{
    return this._http.post(`${this._baseUrl}login`,user)
  }

  //changepassword
  changePassword(user,newPassword):Observable<any>{
    return this._http.put(`${this._baseUrl}change/${newPassword}`,user)
  }

  //forgetPassword
  forgetPassword(id):Observable<any>{
    return this._http.get(`${this._baseUrl}forget_password`+id)
  }

  //forgetPassword
  resetPassword(user):Observable<any>{
    return this._http.post(`${this._baseUrl}reset_password`,user)
  }

  //feedback
  view(username):Observable<any>{
    return this._http.get(`${this._baseUrl}feedback`+username)
  }

}
