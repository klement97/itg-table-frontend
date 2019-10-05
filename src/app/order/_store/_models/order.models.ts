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

export class Category {
	id: number;
	name: string;
}

export class InnerColor {
	id: number;
	name: string;
}

export class OuterColor {
	id: number;
	name: string;
}

export class Order {
	id: number;
	customer: string;
	date_created: string;
}
