import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  constructor(private breakpointObserver: BreakpointObserver) {
  }

  isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  isTablet(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Tablet);
  }
}
