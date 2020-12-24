import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface LoginCreds {
  email: string;
  password: string;
  user_type: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

    private loginstatus = false;
    private type = '';
    isLoggedIn = new Subject<boolean>();
    userType = new Subject<string>();

    constructor(private router: Router,
                private http: HttpClient) {}

  login(cred: LoginCreds) {
      if (cred.user_type !== 'Supplier' ) {
        this.http.post(environment.BASE_URL + 'users/login', cred).
        subscribe((data: any) => {
            console.log(data);
            if (data) {
                this.type = data.type;
                this.userType.next(data.type);
                this.loginstatus = true;
                this.isLoggedIn.next(true);
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
          });
        } else {
           this.http.post(environment.BASE_URL + 'supplier/supplierlogin', cred)
           .subscribe(
             (data: any) => {
              console.log(data);
              if (data) {
                  this.type = data.type;
                  this.userType.next(data.type);
                  this.loginstatus = true;
                  this.isLoggedIn.next(true);
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
                if(error.error.message) {
                  alert(error.error.message);
                } else {
                  alert(error.error);
                }
                this.loginstatus = false;
                this.userType.next('');
                this.type = '';
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
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
  }

  getUser(type: string) {
        let userParams = new HttpParams().set('type', type);
        return this.http.get<any[]>(environment.BASE_URL + 'users/getUser', {params: userParams});
  }

  getSupplier() {
    return this.http.get<any>(environment.BASE_URL + 'supplier/getSupplier');
  }
}
