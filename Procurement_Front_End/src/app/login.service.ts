import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface LoginCreds {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

    loginstatus = false;
    type: any;

    constructor(private router: Router,
                private http: HttpClient) {}

      login(cred: LoginCreds) {

        this.http.post(environment.BASE_URL + 'users/login', cred).
        subscribe((data: any) => {
          console.log(data);
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('type', data.type);
          const status = 'true';
          localStorage.setItem('loginStatus', status);
          localStorage.setItem('username', data.name);
          // tslint:disable-next-line: no-string-literal
          this.type = data.type;
          this.loginstatus = true;
          this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        alert(error.error.message);
        });

      }

      logout() {
        this.loginstatus = false;
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('type');
        this.router.navigate(['/login']);
      }
}
