import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../login.service';
import {first} from 'rxjs/operators';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private login: LoginService
  ) { }

  ngOnInit() {
      const token = this.route.snapshot.queryParams['token'];
      console.log(token);
      // remove token from url to prevent http referer leakage
      this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

      this.login.verifyEmail(token)
          .pipe(first())
          .subscribe({
              next: () => {
                  alert('Verification successful, you can login');
                  this.router.navigate(['/login'], { relativeTo: this.route });
              },
              error: () => {
                  this.emailStatus = EmailStatus.Failed;
              }
          });
  }

}
