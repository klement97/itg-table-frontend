import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth/_store/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  loading: boolean = false;

  hasError: boolean;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
        .subscribe(
          () => {
            this.loading = false;
          },
          error => {
            if (this.checkForCache()) {
              this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe();
            }
            this.loading = false;
            this.hasError = true;
            if (error['error']['non_field_errors']) {
              this.errorMessage = 'Kredenciale të gabuara!';
            }
          }
        );
    }
  }

  hasTokenExpired() {

  }

  checkForCache() {
    if (localStorage.user) {
      localStorage.clear();
      this.errorMessage = 'Problem me serverin!\n Po kryhet ri-autentikimi automatik...';
      return true;
    } else {
      this.errorMessage = 'Problem me serverin!';
    }
  }

}
