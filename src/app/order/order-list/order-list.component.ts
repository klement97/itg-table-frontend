import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {Store} from '@ngrx/store';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import * as OrderActions from 'src/app/order/_store/_actions/order.actions';
import {markUpdateAsTrue} from 'src/app/order/_store/_actions/order.actions';
import {Observable} from 'rxjs';
import {MatDialog, MatPaginator, MatSnackBar, Sort} from '@angular/material';
import {Order} from 'src/app/order/_store/_models/order.models';
import {selectOrderList} from 'src/app/order/_store/_selectors/order.selectors';
import {OrderDetailDialogComponent} from 'src/app/order/dialogs/order-detail-dialog/order-detail-dialog.component';
import {Router} from '@angular/router';
import {clearOrderUnits} from '../_store/_actions/order-unit.actions';
import {ConfirmationDialogComponent} from 'src/app/layout/dialogs/delete-dialog/confirmation-dialog.component';
import {SendOrderEmailDialogComponent} from 'src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
	@ViewChild('paginator', {static: true}) paginator: MatPaginator;
	count: number = 0;
	displayedColumns: string[] = ['id', 'customer', 'date_created', 'total_price', 'total_table_count', 'actions'];
	loading: boolean = true;

	orders$: Observable<Order[]>;

	constructor(private orderService: OrderService, private store: Store<fromOrder.State>, private dialog: MatDialog,
							private router: Router, private snackbar: MatSnackBar) {
		this.orders$ = store.select(selectOrderList);
	}

	ngOnInit() {
		this.getOrders(null);
	}

	getOrders(ordering) {
		const filter = {};
		filter['order'] = ordering;
		filter['customer'] = '%';
		filter['date_from'] = '';
		filter['date_where'] = '';

		// this.orderService.filterOrderList(filter).subscribe(response => {
		// 	this.loading = false;
		// 	this.count = response['count'];
		// 	this.store.dispatch(OrderActions.loadOrders({orders: response['results']}));
		// });

		this.orderService.getOrderList(this.paginator.pageIndex + 1, '', null).subscribe(response => {
			this.loading = false;
			this.count = response['count'];
			this.store.dispatch(OrderActions.loadOrders({orders: response['results']}));
		});
	}

	deleteOrder(id: number) {
		const dialogRef$ = this.dialog.open(ConfirmationDialogComponent, {
			minWidth: '300px',
			width: '30%',
			data: {title: `Porosia me ID: ${id}`},
			panelClass: 'padding-0'
		});

		dialogRef$.afterClosed().subscribe(result => {
			if (result.confirmed) {
				this.orderService.deleteOrder(id).subscribe(() => {
					this.store.dispatch(OrderActions.deleteOrder({id}));
				});
			}
		});
	}

	showDetails(order) {
		this.dialog.open(OrderDetailDialogComponent, {width: '45%', minWidth: '300px', data: {'order': order}});
	}

	updateOrder(id) {
		this.store.dispatch(clearOrderUnits());
		this.store.dispatch(markUpdateAsTrue({orderId: id}));
		this.router.navigate([`/order/form/${id}`]).then();
	}

	changeSort(event: Sort) {
		const field = event.active;
		const direction = '' ? event.direction === 'asc' : '-';
		const ordering = `${direction}${field}`;
		this.getOrders(ordering);
	}

	changePage() {
		this.orderService.getOrderList(this.paginator.pageIndex + 1).subscribe(
			response => {
				this.store.dispatch(OrderActions.loadOrders({orders: response['results']}));
			}
		);
	}

	openEmailSendDialog(order: Order) {
		let to_emails: string[] = [];

		const dialogRef$ = this.dialog.open(SendOrderEmailDialogComponent, {
			width: '30%',
			minWidth: '300px',
			maxHeight: '450px',
			data: {'order': order}
		});

		dialogRef$.afterClosed().subscribe(result => {
			if (result) {
				if (result['to_emails']) {
					for (let item of result['to_emails']) {
						to_emails.push(item['email']);
					}
					this.orderService.sendOrderMail(to_emails, order).subscribe(
						() => {
							this.snackbar.open('Email u dërgua me sukses!', 'OK', {
								duration: 2500, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-success'
							});
						},
						() => {
							this.snackbar.open('Problem në dërgim, ju lutem provojeni përsëri!', 'OK', {
								duration: 3000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-danger'
							});
						});
				}
			}
		});
	}

}
