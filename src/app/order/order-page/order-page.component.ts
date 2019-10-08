import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {Table} from 'src/app/order/_store/_models/order.models';
import {MatDialog} from '@angular/material';
import {ImageDetailComponent} from 'src/app/order/dialogs/image-detail/image-detail.component';
import {TableFormComponent} from 'src/app/order/dialogs/table-form/table-form.component';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {addOrderUnit} from 'src/app/order/_store/_actions/order-unit.actions';
import * as fromTables from 'src/app/order/_store/_actions/table.actions';
import {Observable, Subscription} from 'rxjs';
import {selectAllTables} from 'src/app/order/_store/_reducers/table.reducer';
import {selectTables} from 'src/app/order/_store/_selectors/table.selectors';

@Component({
	selector: 'app-order-page',
	templateUrl: './order-page.component.html',
	styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {
	tables$: Observable<Table[]>;
	fake_id = 1;
	subs$ = new Subscription();

	constructor(private orderService: OrderService, public dialog: MatDialog, private store: Store<OrderUnitState>) {
		this.tables$ = store.select(selectTables);
	}

	ngOnInit() {
		this.subs$ = this.store.select(selectTables).subscribe(
			tables => {
				if (!tables.length) {
					this.getAllTables();
				}
			}
		);
	}

	ngOnDestroy(): void {
		this.subs$.unsubscribe();
	}

	getAllTables() {
		return this.orderService.getTables()
			.subscribe(response => {
				this.store.dispatch(fromTables.addTables({tables: response['results']}));
			});
	}

	openPhoto(path: string) {
		this.dialog.open(ImageDetailComponent, {
			data: {
				'path': path
			}
		});
	}

	openForm(table: Table) {
		this.dialog.open(TableFormComponent, {
			data: {
				'table': table
			}
		}).afterClosed().subscribe(result => {
			if (result) {
				const orderUnit: OrderUnit = {...result['order']};
				orderUnit.id = this.fake_id++;
				orderUnit.table = table;
				this.store.dispatch(addOrderUnit({orderUnit}));
			}
		});
	}

}
