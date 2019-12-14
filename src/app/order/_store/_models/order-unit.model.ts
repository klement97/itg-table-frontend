export class OrderUnit {
  id: number;
  width: number;
  height: number;
  depth: number;
  table: any;
  description: string;
  amount: number;
  price: number;

  constructor() {
    this.id = null;
    this.width = null;
    this.depth = null;
    this.height = null;
    this.table = null;
    this.description = '';
    this.amount = null;
    this.price = null;
  }
}
