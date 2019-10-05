import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Table} from 'src/app/order/_models/order.models';

@Component({
	selector: 'app-table-detail',
	templateUrl: './table-detail.component.html',
	styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

	constructor(private dialogRef: MatDialogRef<TableDetailComponent>,
							@Inject(MAT_DIALOG_DATA) private data: Table) {
	}

	ngOnInit() {
	}

}
