import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import {BehaviorSubject, Subject,Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface LoginCreds {
  email: string;
  password: string;
  user_type: string;
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

    private loginstatus = false;
    private token: string;
    private type = '';
    isLoggedIn = new Subject<boolean>();
    userType = new Subject<string>();
    isVerified = new Subject<boolean>();
    userEmail = new BehaviorSubject<string>('');
    userPassword = new BehaviorSubject<string>('');

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
        this.http.post(environment.BASE_URL + 'users/login', cred).
        subscribe((data: any) => {
            console.log(data);
            if (data) {
                this.type = data.type;
                this.userType.next(data.type);
                this.loginstatus = true;
                this.isLoggedIn.next(true);
                this.auth.setLoggedIn(true);
            }
            // tslint:disable-next-line: no-string-literal
            localStorage.setItem('type', data.type);
            const status = 'true';
            localStorage.setItem('loginStatus', status);
            localStorage.setItem('username', data.name);
            localStorage.setItem('userId', data.id);
            // tslint:disable-next-line: no-string-literal
            this.router.navigate(['/home']);
      }, error => {
            console.log(error);
            alert(error.error.message);
            this.loginstatus = false;
            this.userType.next('');
            this.type = '';
            this.isLoggedIn.next(false);
            this.auth.setLoggedIn(false);
          });
        } else {
           this.http.post(environment.BASE_URL + 'supplier/supplierlogin', cred)
          //  .pipe(
          //   map((data: TokenResponse) => {
          //       if ( data.token) {
          //          this.saveToken(data.token);
          //       }
          //     })
          //   )
           .subscribe(
             (data: any) => {
              console.log(data);
              if (data) {
                  this.type = data.type;
                  this.userType.next(data.type);
                  this.loginstatus = true;
                  this.isLoggedIn.next(true);
                  this.auth.setLoggedIn(true);
              }
              // tslint:disable-next-line: no-string-literal
              localStorage.setItem('type', data.type);
              const status = 'true';
              localStorage.setItem('loginStatus', status);
              localStorage.setItem('username', data.name);
              localStorage.setItem('email', cred.email);
              localStorage.setItem('password', cred.password);
              localStorage.setItem('userId', data.id);
              // tslint:disable-next-line: no-string-literal
              this.router.navigate(['/home']);
             }, error => {
                console.log(error);
                if(error.error.message) {
                  alert(error.error.message);
                } else {
                  alert(error.error);
                }
                this.loginstatus = false;
                this.userType.next('');
                this.type = '';
                this.auth.setLoggedIn(false);
                this.isLoggedIn.next(false);
             }
           );
        }
  }

  logout() {
        this.loginstatus = false;
        this.isLoggedIn.next(false);
        this.userType.next('');
        this.type = '';
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('type');
        localStorage.removeItem('username');
        // localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
        this.token = '';
        this.auth.setLoggedIn(false);
  }

  getUser(type: string) {
        let userParams = new HttpParams().set('type', type);
        return this.http.get<any[]>(environment.BASE_URL + 'users/getUser', {params: userParams});
  }

  getSupplier() {
    return this.http.get<any>(environment.BASE_URL + 'supplier/getSupplier');
  }

  register(user: any): Observable<any> {
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

}
