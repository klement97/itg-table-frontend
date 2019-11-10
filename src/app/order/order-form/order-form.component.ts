import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {InnerColor, Order, OuterColor} from 'src/app/order/_store/_models/order.models';
import {Observable, Subscription} from 'rxjs';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {selectOrderCount, selectOrderUnits} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {SendOrderEmailDialogComponent} from 'src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';

@Component({
	selector: 'app-order-form',
	templateUrl: './order-form.component.html',
	styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
	orderForm: FormGroup;
	innerColors: InnerColor[];
	outerColors: OuterColor[];
	cart$: Observable<OrderUnit[]>;
	orderCount: number;
	orderCountSubs$ = new Subscription();
	order = new Order();

	constructor(private fb: FormBuilder, private store: Store<OrderUnitState>, private orderService: OrderService,
							public dialog: MatDialog, private router: Router, private snackbar: MatSnackBar) {
		this.cart$ = store.select(selectOrderUnits);
		this.orderCountSubs$ = store.select(selectOrderCount).subscribe(count => this.orderCount = count);
	}

	ngOnInit() {
		this.orderService.getColors().subscribe(res => {
			this.innerColors = res['inner_colors'];
			this.outerColors = res['outer_colors'];
		});
		this.initForm();
	}

	ngOnDestroy() {
		this.orderCountSubs$.unsubscribe();
	}

	initForm() {
		this.orderForm = this.fb.group({
			customer: ['', Validators.required],
			outer_color: [null, Validators.required],
			inner_color: [null, Validators.required],
		});
	}

	onSubmit() {
		if (this.orderCount === 0) {
			this.cartEmptySnack();
		} else if (this.orderForm.invalid) {
			this.formInvalidSnack();
		} else {
			this.orderService.createOrder(this.preparedData()).subscribe(
				response => this.router.navigate(['/order/list'])
				// todo: make order list add one action here
			);
		}
	}

	preparedData(): Order {
		this.order = {...this.orderForm.value};
		this.order.order_units = new Array<OrderUnit>();
		this.cart$.subscribe(units => {
			for (let unit of units) {
				let orderUnit = new OrderUnit();
				orderUnit = {...unit};
				// changing orderUnit table attribute from table object to table's id here
				// to be able to send it to WriteSerializer
				orderUnit.table = unit.table.id;
				this.order.order_units.push(orderUnit);
			}
		});
		return this.order;
	}

	openEmailSendDialog() {
		const order = this.preparedData();
		let to_emails: string[] = [];

		if (this.orderCount === 0) {
			this.cartEmptySnack();
		} else if (this.orderForm.invalid) {
			this.formInvalidSnack();
		} else {
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

	cartEmptySnack() {
		this.snackbar.open('Asnje produkt në shport!', '', {
			verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-warning', duration: 1300
		});
	}

	formInvalidSnack() {
		this.snackbar.open('Forma nuk eshte valide!', '', {
			verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-danger', duration: 1300
		});
	}


}
