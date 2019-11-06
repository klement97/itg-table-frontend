import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/auth/_services/auth.service';
import {catchError} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromError from 'src/app/auth/_store/_reducers/error.reducer';
import * as ErrorActions from 'src/app/auth/_store/_actions/error.actions';
import { selectHasError, selectError } from '../_store/_selectors/error.selectors';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	hide = true;
	loading: boolean = false;

	hasError: Observable<boolean>;
	errorMessage: string = '';

	constructor(private fb: FormBuilder, private auth: AuthService, private store: Store<fromError.State>) {
		this.hasError = store.select(selectHasError);
		store.select(selectError).subscribe(error => {
			if (error) {
				this.errorMessage = error.error.detail;
			}
		})
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	submit() {
		this.loading = true;
		this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
			.subscribe(
				response => {
					if (response) {
						this.loading = false;
					}
				},
			);
	}

}
