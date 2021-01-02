import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmPassword} from './confirm_password.validators';
import { first } from 'rxjs/operators';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent implements OnInit {

   questions = [
   'Which is your favourite city?',
   'Which is your favourite fruit?',
   'What is your birth place?'
  ];

  languages = ['English', 'Hindi', 'Spanish', 'French', 'Japanese', 'Chinese'];
  register: FormGroup;

  checked = false;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private login: LoginService) { }

  ngOnInit() {
    this.register = this.formBuilder.group({
      company_name: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: [null, [Validators.required, Validators.maxLength(6)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      website: [''],
      tax: ['', Validators.required],
      lang: ['', Validators.required],
      ques: ['', Validators.required],
      ans: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]],
      fax: [null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: ConfirmPassword('password', 'confirmPassword')
  });
}

get r() { return this.register.controls; }

  signUp() {
    console.log(this.register);
    this.login.register(this.register.value)
    .subscribe({
        next: () => {
            alert('Registration successful, please check your email for verification instructions');
            // this.router.navigate(['../login'], { relativeTo: this.route });
            this.router.navigate(['/login']);
        },
        error: error => {
          console.log(error);
        }
    });
  }

  goBack() {
    this.router.navigate(['/homePage']);
  }
}
