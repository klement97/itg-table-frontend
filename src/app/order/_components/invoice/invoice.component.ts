import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from '../../_store/_models/order.models';
import {selectOrder} from '../../_store/_selectors/order.selectors';
import {getOrder} from '../../_store/_actions/order.actions';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.order$ = store.select(selectOrder);
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const id = +this.route.snapshot.paramMap.get('order_id');
    this.store.dispatch(getOrder({id}));
  }

}
