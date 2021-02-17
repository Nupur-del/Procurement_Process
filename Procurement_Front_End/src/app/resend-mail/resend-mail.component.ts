import { Component, OnDestroy, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resend-mail',
  templateUrl: './resend-mail.component.html',
  styleUrls: ['./resend-mail.component.scss']
})
export class ResendMailComponent implements OnInit, OnDestroy {

  isSending = false;
  emailSubscription: Subscription;

  constructor(private loginService: LoginService,
              private snack: MatSnackBar) { }

  ngOnInit() {}

  resendEmail() {

    this.emailSubscription = this.loginService.userEmail.subscribe(email => {
      if (email) {
        this.isSending = true;
        this.loginService.resendEmail(email).subscribe((data: any) => {
          console.log(data);
          this.isSending = false;
            this.snack.open(data.message, '', {duration: 3000});
        })
      }
    })
  }

  signOut() {
      this.loginService.logout();
  }

  ngOnDestroy() {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }
}
