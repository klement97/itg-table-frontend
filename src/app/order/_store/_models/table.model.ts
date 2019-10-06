import {Category, InnerColor, OuterColor} from 'src/app/order/_store/_models/order.models';

export class Table {
	id: number;
	code: string;
	image: string;
	height: number;
	width: number;
	depth: number;
	category: Category;
	inner_color: InnerColor;
	outer_color: OuterColor;
}
