import {Injectable} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryObserverService {
  matchesMediumQuery$: Observable<boolean>;

  constructor(
    breakpointObserver: BreakpointObserver,
  ) {
    this.matchesMediumQuery$ = breakpointObserver.observe([
      Breakpoints.Medium,
    ]).pipe(
      map(
        (breakpointState: BreakpointState): boolean => {
          return breakpointState.matches;
        },
      ),
    );
  }
}
