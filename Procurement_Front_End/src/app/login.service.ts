import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import {MatSnackBar} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface LoginCreds {
  email: string;
  password: string;
  user_type: string;
  userId: number;
}

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

    loginstatus = false;
    private token: string;
    type = '';
    isLoggedIn = new BehaviorSubject<boolean>(false);
    userType = new BehaviorSubject<string>('');
    isVerified = new BehaviorSubject<boolean>(false);
    userEmail = new BehaviorSubject<string>('');
    userPassword = new BehaviorSubject<string>('');
    RegistrationCount = new BehaviorSubject<number>(0);
    notification = new BehaviorSubject<string>('');
    tempregCount = 0;
    userId = new BehaviorSubject<number>(0);

    private saveToken(token: string): void {
      localStorage.setItem('userToken', token);
      this.token = token;
    }

    private getToken(): string {
      if (!this.token) {
        this.token = localStorage.getItem('userToken');
      }
      return this.token;
    }

    public getUserDetails(): UserDetails {
      const token = this.getToken();
      let payload;
      if (token) {
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      } else {
            return null;
      }
    }

    constructor(private router: Router,
                private http: HttpClient,
                private snack: MatSnackBar,
                private auth: AuthService) {}

  login(cred: LoginCreds) {
    this.userEmail.next(cred.email);
    this.userPassword.next(cred.password);
    console.log(cred.email);
    console.log(cred.password);
    this.userEmail.subscribe(data => {
      console.log(data);
    })
    this.userPassword.subscribe(pass => {
      console.log(pass);
    })

      if (cred.user_type !== 'Supplier' ) {
        console.log('I am inside it');
        return this.http.post(environment.BASE_URL + 'users/login', cred);
        } else {
          console.log('I am here');
          return this.http.post(environment.BASE_URL + 'supplier/supplierlogin', cred);
          //  .pipe(
          //   map((data: TokenResponse) => {
          //       if ( data.token) {
          //          this.saveToken(data.token);
          //       }
          //     })
          //   )
        }
  }

  logout() {
        this.loginstatus = false;
        this.isLoggedIn.next(false);
        this.userType.next('');
        this.type = '';
        this.token = '';
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('type');
        localStorage.removeItem('username');
        localStorage.removeItem('userToken');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('userId');
        localStorage.removeItem('Verified');
        localStorage.removeItem('Approved');
        this.auth.setLoggedIn(false);
        this.auth.setVerified(false);
        this.router.navigate(['/login']);
  }

  verifyEmail(token: any) {
      let sendToken = {
        token: token
      };
      return this.http.post<any>(environment.BASE_URL + 'supplier/verify-email', sendToken);
  }

  getUser(type: string) {
        let userParams = new HttpParams().set('type', type);
        return this.http.get<any[]>(environment.BASE_URL + 'users/getUser', {params: userParams});
  }

  getSupplier() {
    return this.http.get<any>(environment.BASE_URL + 'supplier/getSupplier');
  }

  register(user: any): Observable<any> {
    console.log(user);
    const base = this.http.post(environment.BASE_URL + 'supplier/supplierRegistration', user);
    const request = base.pipe(
      map((data: TokenResponse) => {
          if ( data.token) {
             this.saveToken(data.token);
          }
          return data;
      })
    );
    return request;
  }

  getNotified() {
    return this.http.get(environment.BASE_URL + 'supplier/getPending');
  }

  getCount() {
    this.http.get(environment.BASE_URL + 'supplier/getCountofPending').subscribe(
      (data: any) => {
              this.RegistrationCount.next(data.count);
      }
    )
    return this.RegistrationCount;
  }

  getrows() {
    return this.http.get(environment.BASE_URL + 'supplier/getCountofPending')
  }

  resendEmail(value) {
    let email = {
      email : value
    };
    return this.http.post(environment.BASE_URL + 'supplier/resendEmail', email);
  }

  updateSupplierDetails(id: any, status: any) {
    let data = {
      id: id,
      isapproved: status
    };
    console.log(data);
    return this.http.put(environment.BASE_URL + 'supplier/updateSupp', data);
  }

  getdetails_byID(id: any) {
    let sparam = new HttpParams().set('id', id);
    return this.http.get(environment.BASE_URL + 'supplier/getsuppbyid', {params: sparam});
  }

}
