import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDialogDataModel} from 'src/app/order/const';

@Component({
	selector: 'app-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
	_title: string = '';
	_message: string = '';

	constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: DeleteDialogDataModel,) {
	}

	ngOnInit() {
		if (this.data.message) {
			this._message = this.data.message;
		} else {
			this._message = 'Jeni të sigurt që doni ta fshini?';
		}

		if (this.data.title) {
			this._title = this.data.title;
		}
	}

	onYesClick() {
		this.dialogRef.close({delete: true});
	}

	onNoClick() {
		this.dialogRef.close({delete: false});
	}

}
