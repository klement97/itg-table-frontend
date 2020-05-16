import {Component, ElementRef, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSidenav} from '@angular/material/sidenav';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {selectOrderCount} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';
import {selectUpdateOrderId} from '../../order/_store/_selectors/order.selectors';
import {ConfirmationDialogComponent} from 'src/app/layout/dialogs/confirmation-dialog/confirmation-dialog.component';
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  cartCount: number = null;
  updateOrderId: number;
  @ViewChild('drawer', {static: true}) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                                        .pipe(
                                          map(result => result.matches),
                                          share()
                                        );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private store: Store<OrderUnitState>,
    private auth: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    store.select(selectOrderCount).subscribe(count => this.cartCount = count);
    store.select(selectUpdateOrderId).subscribe(id => this.updateOrderId = id);
    router.events.subscribe(_ => {
      if (breakpointObserver.isMatched(Breakpoints.Handset)) {
        return this.drawer.close();
      }
    });
    const hammer = new Hammer(elementRef.nativeElement, {});
    hammer.on('panright', (ev) => {
      if (ev.pointerType !== 'mouse') {
        this.drawer.open().then();
      }
    });
    hammer.on('panleft', (ev) => {
      if (ev.pointerType !== 'mouse') {
        this.drawer.close().then();
      }
    });
  }


  logout() {
    const dialogRef$ = this.dialog.open(ConfirmationDialogComponent, {
      width: '35%',
      minWidth: '250px',
      panelClass: ['padding-0'],
      backdropClass: 'no-shadow',
      position: {top: '60px', right: '12px'},
      data: {
        title: '',
        message: 'Jeni të sigurt që doni të dilni?'
      }
    });

    dialogRef$.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.auth.logout().subscribe();
      }
    });
  }
}
