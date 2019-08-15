import {LocalizationDataSourceInterface} from '../../util/feature-folder/localization/data-source/localization-data-source-interface';
import {BehaviorSubject, interval, Observable, of, Subject, timer} from 'rxjs';
import {buffer, debounceTime, filter, first, mergeMap, shareReplay, tap} from 'rxjs/operators';
import * as localForage from 'localforage';
import {LocaleWithMessageCodeInterface} from './locale-with-message-code-interface';

export class LocalizationDataSource implements LocalizationDataSourceInterface {
  localeListContinuous$: Observable<Array<string>>;

  private _currentLocaleBS$WrapBS$ = new BehaviorSubject<BehaviorSubject<string>>(null);
  private _currentLocaleContinuous$: Observable<string>;
  private _currentLocaleDBKey = 'currentLocale';
  private _currentLocaleLocalForage = localForage.createInstance({
    name: `${LocalizationDataSource.name}-${this._currentLocaleDBKey}`,
  });
  private _debounceTime = 0;
  private _localizationLocalForage = localForage.createInstance({
    name: LocalizationDataSource.name,
  });
  private _localeWithPrefixToLocalizedMessageBS$Map = new Map<string, BehaviorSubject<string>>();
  private _requestImitationTime = 100;
  private _requestedLocaleWithMessageCodeS$ = new Subject<LocaleWithMessageCodeInterface>();

  constructor() {
    this._currentLocaleContinuous$ = this._waitForCurrentLocaleBS$().pipe(
      mergeMap(currentLocaleBS$ => currentLocaleBS$),
      // using shareReplay to not duplicate streams, but still serve it to late subscribers
      shareReplay(1),
    );

    this._requestedLocaleWithMessageCodeS$.pipe(
      buffer(this._requestedLocaleWithMessageCodeS$.pipe(debounceTime(this._debounceTime))),
    ).subscribe(requestedLocaleWithMessageCodeList => {
      this._loadLocalizationMessageList$(requestedLocaleWithMessageCodeList).subscribe(localizationMessageList => {
        const localeWithPrefixToLocalizedMessageBS$Map = this._localeWithPrefixToLocalizedMessageBS$Map;
        localizationMessageList.forEach((localizationMessage, index) => {
          const localeWithMessageCode = requestedLocaleWithMessageCodeList[index];
          const localeWithMessageCodeString = this._getLocaleWithMessageCodeString(
            localeWithMessageCode.locale,
            localeWithMessageCode.messageCode,
          );
          localeWithPrefixToLocalizedMessageBS$Map.get(localeWithMessageCodeString).next(localizationMessage);
          this._localizationLocalForage.setItem<string>(localeWithMessageCodeString, localizationMessage);
        });
      });
    });

    this._currentLocaleLocalForage.getItem<string>(this._currentLocaleDBKey).then((currentLocale) => {
      const currentLocaleBS$ = new BehaviorSubject(currentLocale || 'en');
      currentLocaleBS$.subscribe(currentLocale2 => {
        this._currentLocaleLocalForage.setItem<string>(this._currentLocaleDBKey, currentLocale2);
      });

      // todo remove debug code
      const localeList = ['en', 'ru', 'ge', 'jp'];
      interval(1000).subscribe((num) => {
        this.setLocale$(`${localeList[num % localeList.length]}`).subscribe();
      });

      this._currentLocaleBS$WrapBS$.next(currentLocaleBS$);
    });
  }

  public getLocalizedMessageContinuous$(messageCode: string): Observable<string> {
    // todo pay attention that method takes only message code and is used in pure pipe, so it has to either return self-recomputing
    //  Observable(which is not effective, as even keys that were removed from page will be recomputed on locale change), or take both
    //  messageCode and locale, which will require moving locale passing logic to either pipe transform method(best choice, if possible), or
    //  into template(which is not DRY, not readable, not easy to use)

    // todo try getting by key from in-memory map, then from persistent storage, then if got from persistent storage - register in
    //  in-memory map, else, add BehaviorSubject<LocalizedMessage> to in-memory map by key Locale+MessageCode, but with null value, add key
    //  to requested key list - BehaviorSubject<Array<Locale+MessageCode>>, which will have subscription that sends list to server
    //  on debounced(because it will likely send data to server, which we do not want to happen for each key one by one) requested key list
    //  change and sends values to in-memory map and persistent storage
    return this._currentLocaleContinuous$.pipe(
      mergeMap(locale => {
        const localeWithMessageCode = this._getLocaleWithMessageCodeString(locale, messageCode);
        let inMemoryLocalizationMessageBS$ = this._localeWithPrefixToLocalizedMessageBS$Map.get(localeWithMessageCode);
        if (!inMemoryLocalizationMessageBS$) {
          inMemoryLocalizationMessageBS$ = new BehaviorSubject<string>(null);
          this._localeWithPrefixToLocalizedMessageBS$Map.set(localeWithMessageCode, inMemoryLocalizationMessageBS$);

          this._localizationLocalForage.getItem<string>(localeWithMessageCode).then(localizationMessage => {
            if (localizationMessage) {
              inMemoryLocalizationMessageBS$.next(localizationMessage);
            } else {
              this._requestedLocaleWithMessageCodeS$.next({
                locale,
                messageCode,
              });
            }
          });
        }
        return inMemoryLocalizationMessageBS$;
      }),
      filter(x => !!x),
    );
  }

  public setLocale$(locale: string): Observable<string> {
    return this._waitForCurrentLocaleBS$().pipe(
      tap(currentLocaleBS$ => {
        currentLocaleBS$.next(locale);
      }),
      mergeMap(currentLocaleBS$ => currentLocaleBS$),
      first(),
    );
  }

  private _getLocaleWithMessageCodeString(
    locale: string,
    messageCode: string,
  ): string {
    return `${locale}|${messageCode}`;
  }

  private _loadLocalizationMessageList$(
    localeWithMessageCodeList: Array<LocaleWithMessageCodeInterface>,
  ): Observable<Array<string>> {
    // todo remove log
    console.log(localeWithMessageCodeList);
    return timer(this._requestImitationTime).pipe(
      mergeMap(() => of(localeWithMessageCodeList.map(localeWithMessageCode => {
        return this._getLocaleWithMessageCodeString(
          localeWithMessageCode.locale,
          localeWithMessageCode.messageCode,
        );
      }))),
    );
  }

  private _waitForCurrentLocaleBS$(): Observable<BehaviorSubject<string>> {
    return this._currentLocaleBS$WrapBS$.pipe(
      filter(x => !!x),
    );
  }
}
