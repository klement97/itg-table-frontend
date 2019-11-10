import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-send-order-email-dialog',
	templateUrl: './send-order-email-dialog.component.html',
	styleUrls: ['./send-order-email-dialog.component.css']
})
export class SendOrderEmailDialogComponent implements OnInit {
	toEmailsForm: FormGroup;

	constructor(private dialogRef: MatDialogRef<SendOrderEmailDialogComponent>,
							private fb: FormBuilder) {
	}

	ngOnInit() {
		this.initialToEmailsForm();
	}

	initialToEmailsForm() {
		this.toEmailsForm = this.fb.group({
			to_emails: this.fb.array([this.createEmail()])
		});
	}

	createEmail(): FormGroup {
		return this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	get emails() {
		return this.toEmailsForm.get('to_emails') as FormArray;
	}

	addEmail() {
		this.emails.push(this.createEmail());
	}

	removeEmail(index: number) {
		this.emails.controls.splice(index, 1);
	}

	onYesClick() {
		if (this.toEmailsForm.valid) {
			this.dialogRef.close({'to_emails': this.toEmailsForm.value.to_emails});
		}
	}

	onNoClick() {
		this.dialogRef.close();
	}

}
