import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
        const firstChild = this.activatedRoute.firstChild;
        if (firstChild) {
          this.showHeader = firstChild.snapshot.data.showHeader !== false;
          this.showSidebar = firstChild.snapshot.data.showSidebar !== false;
          this.showFooter = firstChild.snapshot.data.showFooter !== false;
        }
      }
    });
  }
}
