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
import {SendOrderEmailDialogComponent} from 'src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';
import {selectAllOrderEntities} from '../_store/_reducers/order.reducer';
import {selectOrderEntities} from '../_store/_selectors/order.selectors';
import {loadOrderUnits} from '../_store/_actions/order-unit.actions';
import {addOrderForUpdate} from '../_store/_actions/order.actions';

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
      if (this.update) {
        this.orderService.updateOrder(this.preparedData()).subscribe(
          response => this.router.navigate(['/order/list'])
          // todo: make order list update one action here
        );
      } else {
        this.orderService.createOrder(this.preparedData()).subscribe(
          response => this.router.navigate(['/order/list'])
          // todo: make order list add one action here
        );
      }
    }
  }

  preparedData(): Order {
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
    return this.order;
  }

  openEmailSendDialog() {
    const order = this.preparedData();
    let to_emails: string[] = [];

    if (this.orderCount === 0) {
      this.cartEmptySnack();
    } else if (this.orderForm.invalid) {
      this.formInvalidSnack();
    } else {
      const dialogRef$ = this.dialog.open(SendOrderEmailDialogComponent, {
        width: '30%',
        minWidth: '300px',
        maxHeight: '450px',
        data: {'order': order}
      });

      dialogRef$.afterClosed().subscribe(result => {
        if (result) {
          if (result['to_emails']) {
            for (let item of result['to_emails']) {
              to_emails.push(item['email']);
            }
            this.orderService.sendOrderMail(to_emails, order).subscribe(
              () => {
                this.snackbar.open('Email u dërgua me sukses!', 'OK', {
                  duration: 2500, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-success'
                });
              },
              () => {
                this.snackbar.open('Problem në dërgim, ju lutem provojeni përsëri!', 'OK', {
                  duration: 3000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'snack-danger'
                });
              });
          }
        }
      });
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
