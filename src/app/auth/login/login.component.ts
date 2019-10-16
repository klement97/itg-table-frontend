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
	hide = true;
	loading: boolean = false;

	constructor(private fb: FormBuilder, private auth: AuthService) {
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: [''],
			password: [''],
		});
		// this.makeStyling();
	}

	submit() {
		this.loading = true;
		this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe(
			response => {
				if (response) {
					this.loading = false;
				}
			}
		);
	}

	makeStyling() {
		let height = screen.availHeight;
		let picture = document.getElementById('picture_login');
		picture.style.width = height * 1.65 + 'px';
		let section = document.getElementsByTagName('section')[0];
		section.style.minHeight = height + 'px';
	}

}
