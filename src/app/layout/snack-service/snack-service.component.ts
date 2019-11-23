import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
	selector: 'app-snack-service',
	templateUrl: './snack-service.component.html',
	styleUrls: ['./snack-service.component.css']
})
export class SnackServiceComponent implements OnInit {

	constructor(private snackbar: MatSnackBar) {
	}

	ngOnInit() {
	}

	successSnack(verticalPosition: string, horizontalPosition: string) {
	}

	infoSnack() {
	}

	warningSnack() {
	}

	dangerSnack() {
	}

}
