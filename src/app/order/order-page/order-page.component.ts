import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/order/order.service';
import {Order, OrderUnit, Table} from 'src/app/order/_models/order.models';
import {MatDialog} from '@angular/material';
import {TableDetailComponent} from 'src/app/order/dialogs/table-detail/table-detail.component';

@Component({
	selector: 'app-order-page',
	templateUrl: './order-page.component.html',
	styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
	tables: Table[];
	cart = new Array<OrderUnit>();

	constructor(private orderService: OrderService, private dialog: MatDialog) {
	}

	ngOnInit() {
		this.getAllTables();
	}

	getAllTables() {
		return this.orderService.getTables()
			.subscribe(response => this.tables = response['results']);
	}

	addTableToCart(table: Table) {
		this.dialog.open(TableDetailComponent, {
			data: {
				table
			}
		}).afterClosed().subscribe(res => {
			this.cart.push(res);
			console.log(res);
			console.log(this.cart);
		});
	}
}
