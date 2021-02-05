import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {ConfirmPassword} from './confirm_password.validators';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../login.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
  filteredOptions: Observable<string[]>;
  itemCategories: string[] = [];
  category = [];
  isSending = false;
  categories = new FormControl('', Validators.required);

  checked = false;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar,
              private login: LoginService,
              private http: HttpClient) { }

  ngOnInit() {

    this.http.get(environment.BASE_URL + 'category/categories').subscribe(
      (items: any) => {
        this.itemCategories = items;
        console.log(this.itemCategories);
      }
    )

    this.autocomplete();
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
      yearofest:[null, Validators.required],
      licenseno: ['', Validators.required],
      tax: ['', Validators.required],
      lang: ['', Validators.required],
      ques: ['', Validators.required],
      ans: ['', Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      fax: [null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: ConfirmPassword('password', 'confirmPassword')
  });
}

get r() { return this.register.controls; }

  signUp() {
    console.log(this.register.controls);
    const registrationData = {
      ...this.register.value,
      categories: this.category
    }
    console.log(registrationData);
    this.isSending = true;
    this.login.register(registrationData)
    .subscribe(response => {
      console.log(response);
      this.isSending = false;
          this.snack.open('Registration successful, please check your email for verification instructions', '', {duration: 3000});
            // this.router.navigate(['../login'], { relativeTo: this.route });
            this.router.navigate(['/login']);
        },
        error => {
          this.isSending = false;
          this.snack.open(error.error.message, '', {duration: 3000});
          console.log(error);
        });
  }

  goBack() {
    this.router.navigate(['/homePage']);
  }

  autocomplete() {
    this.filteredOptions = this.categories.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.itemCategories, value))
    );
  }

  private _filter(feature: string[], value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return feature.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  addNewProject(control) {
    console.log(this.r.categories);
    this.category.push(control);
    console.log(this.category);
    this.categories.reset();
  }

  deleteProject(index) {
    this.category.splice(index,1);
    console.log(this.category);
  }

}
