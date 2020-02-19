import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {_TOKEN, AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  loading = false;

  hasError: boolean;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.initialLoginForm();
    if (this.cookieService.check(_TOKEN)) {
      this.router.navigate(['order/tables']).then();
    }
  }

  initialLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(
        () => this.loading = false,
        error => {
          this.loading = false;
          this.hasError = true;
          if (error.error.non_field_errors) {
            this.errorMessage = 'Kredenciale të gabuara!';
          }
        }
      );
  }

}
