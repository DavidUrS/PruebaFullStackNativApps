import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_USERS  =  'http://localhost:3000';
  constructor(private http: HttpClient) { }

  postuser(user:Users){
    return this.http.post(`${this.API_USERS}/users`,user)
  }

  loginUser(user:Users){
    return this.http.post(`${this.API_USERS}/users/login`,user)
  }

}
