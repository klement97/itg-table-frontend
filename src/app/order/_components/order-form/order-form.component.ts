import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {InnerColor, Order, OuterColor} from 'src/app/order/_store/_models/order.models';
import {Observable, Subscription} from 'rxjs';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {selectOrderCount, selectOrderUnits} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {selectOrderEntities} from '../../_store/_selectors/order.selectors';
import {clearOrderUnits, loadOrderUnits} from '../../_store/_actions/order-unit.actions';
import {addOrderForUpdate} from '../../_store/_actions/order.actions';
import {take} from 'rxjs/operators';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  innerColors: InnerColor[];
  outerColors: OuterColor[];
  cart$: Observable<OrderUnit[]>;
  orderCount: number;
  orderCountSubs$ = new Subscription();
  order = new Order();
  isUpdate = false;
  orderId: number;

  constructor(
    private fb: FormBuilder,
    private store: Store<OrderUnitState>,
    private orderService: OrderService,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.cart$ = store.select(selectOrderUnits);
    this.orderCountSubs$ = store.select(selectOrderCount).subscribe(count => this.orderCount = count);
    this.orderId = +route.snapshot.paramMap.get('order_id');
    this.isUpdate = !!this.orderId;
  }

  ngOnInit() {
    this.getColors();
    this.initialForm();
    this.loadOrder();
  }

  ngOnDestroy() {
    this.orderCountSubs$.unsubscribe();
  }

  getColors() {
    this.orderService.getColors()
      .subscribe((res: { inner_colors: InnerColor[], outer_colors: OuterColor[] }) => {
        this.innerColors = res.inner_colors;
        this.outerColors = res.outer_colors;
      });
  }

  loadOrder() {
    if (this.isUpdate) {
      this.store.select(selectOrderEntities).pipe(take(1)).subscribe(orders => {
        const isOrderInStore: boolean = orders[this.orderId] !== null;
        if (isOrderInStore) {
          this.loadOrderFromStore(orders);
        } else {
          this.getOrderFromServer();
        }
      });
    }
  }

  loadOrderFromStore(orders) {
    this.store.select(selectOrderUnits).pipe(take(1)).subscribe(units => {
      if (units.length === 0) {
        this.store.dispatch(loadOrderUnits({orderUnits: orders[this.orderId].order_units}));
        this.orderForm.patchValue(orders[this.orderId]);
      }
    });
  }

  getOrderFromServer() {
    this.orderService.getOrder(this.orderId)
      .subscribe(response => {
        if (response) {
          this.store.dispatch(addOrderForUpdate({order: response}));
          this.store.dispatch(loadOrderUnits({orderUnits: response.order_units}));
          this.orderForm.patchValue(response);
        }
      });
  }

  initialForm() {
    this.orderForm = this.fb.group({
      customer: ['', Validators.required],
      outer_color: [null, Validators.required],
      inner_color: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.orderCount === 0) {
      this.cartEmptySnack();
      return;
    }
    if (this.orderForm.invalid) {
      this.formInvalidSnack();
      return;
    }
    this.prepareOrder();
    if (this.isUpdate) {
      this.orderService.updateOrder(this.order).subscribe(
        () => {
          this.router.navigate(['/order/list']).then();
          this.store.dispatch(clearOrderUnits());
        }
      );
    } else {
      this.orderService.createOrder(this.order).subscribe(
        () => {
          this.router.navigate(['/order/list']).then();
          this.store.dispatch(clearOrderUnits());
        }
      );
    }
  }

  prepareOrder() {
    this.order = {...this.orderForm.value};
    this.order.order_units = new Array<OrderUnit>();
    this.cart$.subscribe(units => {
      for (const unit of units) {
        let orderUnit = new OrderUnit();
        orderUnit = {...unit};
        // changing orderUnit table attribute from table object to table's id here
        // to be able to send it to WriteSerializer
        orderUnit.table = unit.table.id;
        this.order.order_units.push(orderUnit);
      }
    });
    if (this.isUpdate) {
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
