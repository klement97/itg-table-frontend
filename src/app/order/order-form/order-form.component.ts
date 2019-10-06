import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {InnerColor, Order, OuterColor} from 'src/app/order/_store/_models/order.models';
import {Observable} from 'rxjs';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {selectOrderUnits} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {MatDialog} from '@angular/material';
import {InvoiceComponent} from 'src/app/order/dialogs/invoice/invoice.component';

@Component({
	selector: 'app-order-form',
	templateUrl: './order-form.component.html',
	styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
	orderForm: FormGroup;
	innerColors: InnerColor[];
	outerColors: OuterColor[];
	cart$: Observable<OrderUnit[]>;
	order = new Order();

	constructor(private fb: FormBuilder, private store: Store<OrderUnitState>, private orderService: OrderService,
							private dialog: MatDialog) {
		this.cart$ = this.store.select(selectOrderUnits);
	}

	ngOnInit() {
		this.orderService.getColors().subscribe(res => {
			this.innerColors = res['inner_colors'];
			this.outerColors = res['outer_colors'];
		});
		this.initForm();
	}

	initForm() {
		this.orderForm = this.fb.group({
			customer: ['', Validators.required],
			outer_color: [null, Validators.required],
			inner_color: [null, Validators.required],
		});
	}

	onSubmit() {
		this.orderService.createOrder(this.preparedData()).subscribe(
			response => console.log(response)
		);
	}

	preparedData(): Order {
		this.order = {...this.orderForm.value};
		this.order.order_units = new Array<OrderUnit>();
		this.cart$.subscribe(units => {
			for (let unit of units) {
				let orderUnit = new OrderUnit();
				orderUnit = {...unit};
				orderUnit.table = unit.table.id;
				this.order.order_units.push(orderUnit);
			}
		});
		return this.order;
	}

	openInvoice() {
		this.dialog.open(InvoiceComponent, {
			data: {
				'order': this.preparedData()
			}
		});
	}


}
