import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {slideInAnimation} from 'src/app/routing-animation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
	title = 'italgold-table';
	showHeader = false;
	showSidebar = false;
	showFooter = false;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
				this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
				this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
			}
		});
	}
}
