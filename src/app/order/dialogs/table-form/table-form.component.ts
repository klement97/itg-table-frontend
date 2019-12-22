import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Table} from 'src/app/order/_store/_models/order.models';

@Component({
	selector: 'app-table-form',
	templateUrl: './table-form.component.html',
	styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent {
	orderForm = this.fb.group({
		amount: [1],
		height: [this.data['table'].height, Validators.required],
		width: [this.data['table'].width, Validators.required],
		depth: [this.data['table'].depth, Validators.required],
		description: [''],
	});

	constructor(private fb: FormBuilder,
							public dialogRef: MatDialogRef<TableFormComponent>,
							@Inject(MAT_DIALOG_DATA) public data: Table) {
	}
}
