import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';

export class Table {
	id: number;
	code: string;
	image: string;
	width: number;  // gjeresi
	height: number;  // lartesi
	depth: number;  // gjatesi
	price: number;
	inner_color: InnerColor;
	outer_color: OuterColor;
}

export class InnerColor {
	id: number;
	code: string;
}

export class OuterColor {
	id: number;
	code: string;
}

export class Order {
	id: number;
	customer: string;
	date_created: string;
	order_units: OrderUnit[];
	inner_color: number;
	outer_color: number;

	init() {
		this.id = null;
		this.customer = '';
		this.date_created = '';
		this.order_units = new Array<OrderUnit>();
		this.inner_color = null;
		this.outer_color = null;
	}
}
