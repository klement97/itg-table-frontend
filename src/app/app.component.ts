import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {IosInstallComponent} from './layout/ios-install/ios-install.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgwWowService} from 'ngx-wow';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Italgold';
  showHeader = false;
  showSidebar = false;
  showFooter = false;

  private wowSubs$: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private wowService: NgwWowService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const firstChild = this.activatedRoute.firstChild;
        if (firstChild) {
          this.showHeader = firstChild.snapshot.data.showHeader !== false;
          this.showSidebar = firstChild.snapshot.data.showSidebar !== false;
          this.showFooter = firstChild.snapshot.data.showFooter !== false;
        }
        this.wowService.init();
      }
    });
  }

  ngOnInit() {
    this.wowSubs$ = this.wowService.itemRevealed$.subscribe(
      (item: HTMLElement) => {
      }
    );

    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.snackbar.openFromComponent(IosInstallComponent, {
        duration: 8000,
        horizontalPosition: 'start',
        panelClass: ['mat-elevation-z3']
      });
    }
  }

  ngOnDestroy() {
    // this.wowSubs$.unsubscribe();
  }
}
