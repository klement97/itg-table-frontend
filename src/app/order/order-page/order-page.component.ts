import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {Order} from 'src/app/order/_store/_models/order.models';
import {Table} from 'src/app/order/_store/_models/table.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageDetailComponent} from 'src/app/order/dialogs/image-detail/image-detail.component';
import {TableFormComponent} from 'src/app/order/dialogs/table-form/table-form.component';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {addOrderUnit, loadOrderUnits} from 'src/app/order/_store/_actions/order-unit.actions';
import * as fromTables from 'src/app/order/_store/_actions/table.actions';
import {Observable, Subject} from 'rxjs';
import {selectTables} from 'src/app/order/_store/_selectors/table.selectors';
import {selectFakeId} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {ActivatedRoute} from '@angular/router';
import {selectOrderEntities} from '../_store/_selectors/order.selectors';
import {takeUntil} from 'rxjs/operators';
import {addOrderForUpdate} from '../_store/_actions/order.actions';
import {LayoutService} from '../../layout/layout.service';
import {APIResponse} from '../const';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  tables$: Observable<Table[]>;
  fakeId: number;
  subs$ = new Subject();

  order = new Order();
  isUpdate = false;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private store: Store<OrderUnitState>,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private layoutService: LayoutService
  ) {
    this.tables$ = store.select(selectTables);
    store.select(selectFakeId).subscribe(fakeId => this.fakeId = fakeId);
  }

  ngOnInit() {
    this.selectTables();
    this.update();
  }

  selectTables() {
    this.store.select(selectTables)
      .pipe(takeUntil(this.subs$))
      .subscribe(
        tables => {
          if (!tables.length) {
            this.getAllTables();
          }
        }
      );
  }

  update() {
    if (this.isOrderUpdate()) {
      this.getOrder();
    }
  }

  isOrderUpdate() {
    const id = +this.route.snapshot.paramMap.get('order_id');
    if (id) {
      this.order.id = id;
      this.isUpdate = true;
      return true;
    } else {
      return false;
    }
  }

  getOrder() {
    this.store.select(selectOrderEntities)
      .pipe(takeUntil(this.subs$))
      .subscribe(orderEntities => {
        const order = orderEntities[this.order.id];
        if (order) {
          this.order = order;
          this.pushOrderToStore(order);
          this.pushOrderUnitsToCart(this.order.order_units);
        } else {
          // store is empty, hitting the server
          this.orderService.getOrder(this.order.id)
            .subscribe(
              response => {
                if (response) {
                  this.order = response;
                  this.pushOrderToStore(response);
                  this.pushOrderUnitsToCart(this.order.order_units);
                }
              },
              () => {
                this.snackbar.open('Problem ne lidhje me serverin. Porosia nuk mund te merret.', 'OK', {
                  duration: 3000, verticalPosition: 'top', panelClass: 'snack-danger'
                });
              });
        }
      });
  }

  pushOrderUnitsToCart(orderUnits) {
    this.store.dispatch(loadOrderUnits({orderUnits}));
  }

  pushOrderToStore(order: Order) {
    this.store.dispatch(addOrderForUpdate({order}));
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }

  getAllTables() {
    return this.orderService.getTables()
      .subscribe(
        (response: APIResponse) => {
          this.store.dispatch(fromTables.addTables({tables: response.data}));
        });
  }

  openPhoto(path: string) {
    this.dialog.open(ImageDetailComponent, {maxHeight: '95vh', panelClass: 'padding-0', data: {path}});
  }

  openForm(table: Table) {
    let config: MatDialogConfig = {panelClass: 'padding-0', data: {table}};
    if (this.layoutService.isHandset()) {
      config = {position: {top: '10px'}, maxHeight: '400px', ...config};
    }
    this.dialog.open(TableFormComponent, config)
      .afterClosed()
      .subscribe((result: { order: OrderUnit }) => {
        if (result) {
          const orderUnit: OrderUnit = {...result.order};
          orderUnit.id = this.fakeId;
          orderUnit.table = table;
          this.store.dispatch(addOrderUnit({orderUnit}));
        }
      });
  }

}
