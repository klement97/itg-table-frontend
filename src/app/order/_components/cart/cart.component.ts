import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {Observable, Subscription} from 'rxjs';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {selectOrderCount, selectOrderUnits} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {Update} from '@ngrx/entity';
import {deleteOrderUnit, updateOrderUnit} from 'src/app/order/_store/_actions/order-unit.actions';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {selectUpdateOrderId} from '../../_store/_selectors/order.selectors';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  orderUnits$: Observable<OrderUnit[]>;
  orderCount$: Observable<number>;
  totalPrice = 0;
  cartSubscription$ = new Subscription();

  constructor(private store: Store<OrderUnitState>, private router: Router) {
    this.orderUnits$ = store.select(selectOrderUnits);
    this.orderCount$ = store.select(selectOrderCount).pipe(delay(1000));
  }

  ngOnInit() {
    this.calculateTotalPrice();
  }


  ngOnDestroy(): void {
    this.cartSubscription$.unsubscribe();
  }

  add(event, unit: OrderUnit) {
    event.stopPropagation();
    const update: Update<OrderUnit> = {
      id: unit.id,
      changes: {
        amount: unit.amount + 1
      }
    };
    this.store.dispatch(updateOrderUnit({orderUnit: update}));
  }

  remove(event, unit: OrderUnit) {
    event.stopPropagation();
    const update: Update<OrderUnit> = {
      id: unit.id,
      changes: {
        amount: unit.amount - 1
      }
    };
    this.store.dispatch(updateOrderUnit({orderUnit: update}));
  }

  removeUnit(event, id) {
    event.stopPropagation();
    this.store.dispatch(deleteOrderUnit({id}));
  }

  checkout() {
    this.store.select(selectUpdateOrderId).subscribe(id => {
      if (id) {
        this.router.navigate([`/order/form/${id}`]).then();
      } else {
        this.router.navigate(['/order/form']).then();
      }
    });
  }

  calculateTotalPrice() {
    this.cartSubscription$ = this.store.select(selectOrderUnits).subscribe(orders => {
      if (orders) {
        this.totalPrice = 0;
        for (const order of orders) {
          this.totalPrice += order.amount * order.table.price;
        }
      }
    });
  }

}
