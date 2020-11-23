import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../environments/environment';

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedInStatus = false;
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    console.log('Loggedin', this.loggedInStatus);
  }

  get isLoggedIn() {
    console.log(this.loggedInStatus);
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    let credParams = new HttpParams().set('email', username).set('password', password);
    return this.http.get<myData>(environment.BASE_URL + 'users/auth', {params: credParams});
  }
}
