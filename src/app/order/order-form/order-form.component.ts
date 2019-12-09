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
import {ActivatedRoute, Router} from '@angular/router';
import {selectOrderEntities} from '../_store/_selectors/order.selectors';
import {clearOrderUnits, loadOrderUnits} from '../_store/_actions/order-unit.actions';
import {addOrder, addOrderForUpdate, updateOrder} from '../_store/_actions/order.actions';
import {Update} from '@ngrx/entity';

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
	update = false;
	orderId: number;

	constructor(private fb: FormBuilder, private store: Store<OrderUnitState>, private orderService: OrderService,
							public dialog: MatDialog, private router: Router, private snackbar: MatSnackBar, private route: ActivatedRoute) {
		this.cart$ = store.select(selectOrderUnits);
		this.orderCountSubs$ = store.select(selectOrderCount).subscribe(count => this.orderCount = count);
	}

	ngOnInit() {
		this.orderService.getColors().subscribe(res => {
			this.innerColors = res['inner_colors'];
			this.outerColors = res['outer_colors'];
		});
		this.initForm();
		this.isUpdate();
	}

	ngOnDestroy() {
		this.orderCountSubs$.unsubscribe();
	}

	isUpdate() {
		const id = +this.route.snapshot.paramMap.get('order_id');
		if (id) {
			this.update = true;
			this.orderId = id;
			this.store.select(selectOrderEntities).subscribe(orders => {
				if (orders[id]) {
					this.store.select(selectOrderUnits).subscribe(units => {
						if (units.length == 0) {
							this.store.dispatch(loadOrderUnits({orderUnits: orders[id].order_units}));
						}
					}).unsubscribe();
					this.fillFormForUpdate(orders[id]);
				} else {
					this.orderService.getOrder(id).subscribe(response => {
						if (response) {
							this.store.dispatch(addOrderForUpdate({order: response}));
							this.store.dispatch(loadOrderUnits({orderUnits: response['order_units']}));
							this.fillFormForUpdate(response);
						}
					});
				}
			}).unsubscribe();
			return true;
		} else {
			this.update = false;
			this.orderId = null;
			return false;
		}
	}

	fillFormForUpdate(order: Order) {
		this.orderForm.patchValue(order);
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
			this.prepareOrder();
			if (this.update) {
				this.orderService.updateOrder(this.order).subscribe(
					(order: Order) => {
						this.router.navigate(['/order/list']).then();
						this.store.dispatch(clearOrderUnits());
					}
				);
			} else {
				this.orderService.createOrder(this.order).subscribe(
					(order: Order) => {
						this.router.navigate(['/order/list']).then();
						this.store.dispatch(clearOrderUnits());
					}
				);
			}
		}
	}

	prepareOrder() {
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
		if (this.update) {
			this.order.id = this.orderId;
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
