import {Component, OnInit} from '@angular/core';
import {OrderService} from "src/app/order/order.service";
import {Table} from "src/app/order/_models/order.models";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  tables: Table[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getAllTables();
  }

  getAllTables() {
    return this.orderService.getTables()
      .subscribe(response => this.tables = response['results']);
  }

  addTableToCart(table: Table) {

  }
}
