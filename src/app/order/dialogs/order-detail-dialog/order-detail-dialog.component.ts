import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Order} from 'src/app/order/_store/_models/order.models';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent implements OnInit {
  order: Order;

  constructor(private dialogRef: MatDialogRef<OrderDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.order = data['order'];
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
