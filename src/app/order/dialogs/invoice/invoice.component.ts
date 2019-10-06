import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-invoice',
	templateUrl: './invoice.component.html',
	styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

	constructor(private dialogRef: MatDialogRef<InvoiceComponent>,
							@Inject(MAT_DIALOG_DATA) private data) {
	}

	ngOnInit() {
	}

}
