import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from 'src/app/auth/_services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private auth: AuthService) {
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: [''],
			password: [''],
		});
	}

	submit() {
		this.auth.login(this.loginForm.controls['username'].value,
			this.loginForm.controls['password'].value).subscribe(
			res => console.log(res)
		);
	}

}
