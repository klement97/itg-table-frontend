import {Table} from 'src/app/order/_store/_models/order.models';

export class OrderUnit {
	id: number;
	table: Table;
	description: string;
	amount: number;
}
