import {RouteListDataSourceInterface} from '../route-list-data-source-interface';
import {RouteExampleInterface} from './route-example-interface';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer} from '@angular/cdk/collections';
import {tap} from 'rxjs/operators';

export class RouteListDataSourceExample implements RouteListDataSourceInterface<RouteExampleInterface> {
  readonly dataObjectTreeBS$ = new BehaviorSubject<Array<RouteExampleInterface>>([]);
  readonly filteredDataObjectListBS$: BehaviorSubject<Array<RouteExampleInterface>>;
  readonly filteredDataObjectTreeBS$: BehaviorSubject<Array<RouteExampleInterface>>;

  private _currentUrl: string = null;
  private _dataObjectToParentMapBS$ = new BehaviorSubject(new Map<RouteExampleInterface, RouteExampleInterface>());
  private _dataMatchingCurrentUrlSet = new Set<RouteExampleInterface>();
  private _urlToDataObjectMapBS$ = new BehaviorSubject(new Map<string, RouteExampleInterface>());

  public applySearch(searchString: string): Observable<void> {
    return undefined;
  }

  public connect(collectionViewer: CollectionViewer): Observable<RouteExampleInterface[]> {
    return of(this._generateList(4, 10)).pipe(
      tap(dataObjectTree => {
        this.dataObjectTreeBS$.next(dataObjectTree);

        const dataObjectToParentMap = new Map<RouteExampleInterface, RouteExampleInterface>();
        const urlToDataObjectMap = new Map<string, RouteExampleInterface>();
        for (const dataObject of dataObjectTree) {
          this._appendDataObjectToMaps(
            dataObject,
            dataObjectToParentMap,
            urlToDataObjectMap,
          );
        }
        this._dataObjectToParentMapBS$.next(dataObjectToParentMap);
        this._urlToDataObjectMapBS$.next(urlToDataObjectMap);
      }),
    );
  }

  public disconnect(collectionViewer: CollectionViewer): void {
  }

  public getChildList(dataObject: RouteExampleInterface): Observable<Array<RouteExampleInterface>> {
    return of(dataObject.children || null);
  }

  public getDisplayTextBS$(dataObject: RouteExampleInterface): BehaviorSubject<string> {
    return new BehaviorSubject<string>(dataObject.localizationCode);
  }

  public getUrl(dataObject: RouteExampleInterface): Observable<string> {
    return of(dataObject.url || null);
  }

  public matchesUrl(dataObject: RouteExampleInterface, url: string): Observable<boolean> {
    if (url !== this._currentUrl) {
      this._currentUrl = url;
      const dataObjectToParentMap = this._dataObjectToParentMapBS$.getValue();
      this._dataMatchingCurrentUrlSet = new Set<RouteExampleInterface>();
      let matchingDataObject = this._urlToDataObjectMapBS$.getValue().get(url);
      while (matchingDataObject) {
        this._dataMatchingCurrentUrlSet.add(matchingDataObject);

        matchingDataObject = dataObjectToParentMap.get(matchingDataObject);
      }
    }
    return of(this._dataMatchingCurrentUrlSet.has(dataObject));
  }

  private _appendDataObjectToMaps(
    dataObject: RouteExampleInterface,
    dataObjectToParentMap: Map<RouteExampleInterface, RouteExampleInterface>,
    urlToDataObjectMap: Map<string, RouteExampleInterface>,
    parent: RouteExampleInterface = null,
  ) {
    urlToDataObjectMap.set(dataObject.url, dataObject);
    if (parent) {
      dataObjectToParentMap.set(dataObject, parent);
    }
    const childList = dataObject.children;
    if (childList) {
      for (const child of childList) {
        this._appendDataObjectToMaps(
          child,
          dataObjectToParentMap,
          urlToDataObjectMap,
          dataObject,
        );
      }
    }
  }

  private _generateList(
    levelCount: number,
    countPerLevel: number,
    currentLevelCount = 1,
    parent: RouteExampleInterface = null,
  ): Array<RouteExampleInterface> {
    const routeList: Array<RouteExampleInterface> = [];

    for (const index of Array.from(Array(countPerLevel).keys())) {
      const route: RouteExampleInterface = {
        localizationCode: `${parent ? `${parent.localizationCode}-` : ''}${index + 1}`,
        url: `${parent ? `${parent.url}-` : '/'}${index + 1}`,
      };
      if (currentLevelCount < levelCount) {
        route.children = this._generateList(levelCount, countPerLevel, currentLevelCount + 1, route);
      }
      routeList.push(route);
    }

    return routeList;
  }
}
