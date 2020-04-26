import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {Store} from '@ngrx/store';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import * as OrderActions from 'src/app/order/_store/_actions/order.actions';
import {markUpdateAsTrue} from 'src/app/order/_store/_actions/order.actions';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sort} from '@angular/material/sort';
import {Order} from 'src/app/order/_store/_models/order.models';
import {selectOrderList} from 'src/app/order/_store/_selectors/order.selectors';
import {OrderDetailDialogComponent} from 'src/app/order/dialogs/order-detail-dialog/order-detail-dialog.component';
import {Router} from '@angular/router';
import {clearOrderUnits} from '../_store/_actions/order-unit.actions';
import {ConfirmationDialogComponent} from 'src/app/layout/dialogs/confirmation-dialog/confirmation-dialog.component';
import {SendOrderEmailDialogComponent} from 'src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LayoutService} from '../../layout/layout.service';
import {APIResponse} from '../const';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  count = 0;
  displayedColumns: string[] = ['id', 'customer', 'date_created', 'total_price', 'total_table_count', 'actions'];
  loading = true;
  orders$: Observable<Order[]>;
  filterForm: FormGroup;

  constructor(
    private layoutService: LayoutService,
    private orderService: OrderService,
    private store: Store<fromOrder.State>,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.orders$ = store.select(selectOrderList);
  }

  ngOnInit() {
    this.getOrders('');
    this.initiateFilterForm();
  }

  getOrders(ordering) {
    this.orderService.getOrderList(this.paginator.pageIndex + 1, ordering, null)
      .subscribe((response: APIResponse) => {
        this.loading = false;
        this.count = response.pagination.count;
        this.store.dispatch(OrderActions.loadOrders({orders: response.data}));
      });
  }

  initiateFilterForm() {
    this.filterForm = this.fb.group({
      customer: [''],
      date_created: ['']
    });
  }

  deleteOrder(id: number) {
    const dialogRef$ = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '300px',
      width: '30%',
      data: {title: `Porosia me ID: ${id}`},
      panelClass: 'padding-0'
    });

    dialogRef$
      .afterClosed()
      .subscribe((result: { confirmed: boolean }) => {
        if (result?.confirmed) {
          this.orderService.deleteOrder(id).subscribe(_ => {
            this.store.dispatch(OrderActions.deleteOrder({id}));
            this.count--;
          });
        }
      });
  }

  showDetails(order) {
    let config: MatDialogConfig = {width: '45%', minWidth: '350px', data: {order}};
    if (this.layoutService.isHandset()) {
      config = {width: '95%', maxWidth: '95vh', data: {order}};
    }
    this.dialog.open(OrderDetailDialogComponent, config);
  }

  updateOrder(id) {
    this.store.dispatch(clearOrderUnits());
    this.store.dispatch(markUpdateAsTrue({orderId: id}));
    this.router.navigate(['/order/form/', id]).then();
  }

  changeSort(event: Sort) {
    const field = event.active;
    const direction = '' ? event.direction === 'asc' : '-';
    const ordering = `${direction}${field}`;
    this.getOrders(ordering);
  }

  changePage() {
    this.orderService.getOrderList(this.paginator.pageIndex + 1).subscribe(
      (response: APIResponse) => {
        this.store.dispatch(OrderActions.loadOrders({orders: response.data}));
      }
    );
  }

  openEmailSendDialog(order: Order) {
    const toEmails: string[] = [];

    const dialogRef$ = this.dialog.open(SendOrderEmailDialogComponent, {
      width: '30%',
      minWidth: '300px',
      maxHeight: '450px',
      data: {order}
    });

    dialogRef$
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (result.to_emails) {
            for (const item of result.to_emails) {
              toEmails.push(item.email);
            }
            this.orderService.sendOrderMail(toEmails, order).subscribe(
              () => {
                this.snackbar.open('Email u dërgua me sukses!', 'OK', {
                  duration: 2500,
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                  panelClass: 'snack-success'
                });
              },
              () => {
                this.snackbar.open('Problem në dërgim, ju lutem provojeni përsëri!', 'OK', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'end',
                  panelClass: 'snack-danger'
                });
              });
          }
        }
      });
  }

  filterOrders() {
    this.paginator.pageIndex = 0;
    this.orderService.getOrderList(this.paginator.pageIndex, '', this.filterForm.value)
      .subscribe((response: APIResponse) => {
          this.store.dispatch(OrderActions.clearOrders());
          this.store.dispatch(OrderActions.loadOrders({orders: response.data}));
        }
      );
  }

}
