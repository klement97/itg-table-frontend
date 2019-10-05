import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-image-detail',
	templateUrl: './image-detail.component.html',
	styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

	constructor(private dialogRef: MatDialogRef<ImageDetailComponent>,
							@Inject(MAT_DIALOG_DATA) private data) {
	}

	ngOnInit() {
	}

}
