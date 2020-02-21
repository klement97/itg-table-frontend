import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {IosInstallComponent} from '@src/app/layout/ios-install/ios-install.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Italgold';
  showHeader = false;
  showSidebar = false;
  showFooter = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    router.events.subscribe(event => {
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

  ngOnInit() {
    this.showAddToHomeScreenSnackIfIOS();
  }

  showAddToHomeScreenSnackIfIOS() {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

    if (isIos() && !isInStandaloneMode()) {
      this.snackbar.openFromComponent(IosInstallComponent, {
        duration: 8000,
        horizontalPosition: 'start',
        panelClass: ['mat-elevation-z3']
      });
    }
  }

}
