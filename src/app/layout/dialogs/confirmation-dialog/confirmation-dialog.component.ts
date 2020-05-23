import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogDataModel} from 'src/app/order/const';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  _title = '';
  _message = 'Jeni të sigurt që doni ta fshini?';
  _cancelButton = true;
  _cancelButtonText = 'Jo';
  _confirmButtonText = 'Po';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogDataModel) {
  }

  ngOnInit() {
    this.fillOutComponent();
  }

  fillOutComponent() {
    if (this.data.message) {
      this._message = this.data.message;
    }
    if (this.data.title) {
      this._title = this.data.title;
    }
    if (this.data.cancelButton !== undefined) {
      this._cancelButton = this.data.cancelButton;
    }
    if (this.data.cancelButtonText) {
      this._cancelButtonText = this.data.cancelButtonText;
    }
    if (this.data.confirmButtonText) {
      this._confirmButtonText = this.data.confirmButtonText;
    }
  }

  onYesClick() {
    this.dialogRef.close({confirmed: true});
  }

  onNoClick() {
    this.dialogRef.close({confirmed: false});
  }

}
