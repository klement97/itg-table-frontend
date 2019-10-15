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

		let height = screen.availHeight;
		let picture = document.getElementById('picture_login');
		picture.style.width = height * 1.65 + 'px';
		let section = document.getElementsByTagName('section')[0];
		section.style.minHeight = height + 'px';

		document.getElementsByClassName('login-form')[0].style.width = screen.availWidth - height * 1.65 + 'px';
	}

	submit() {
		this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe();
	}

}
