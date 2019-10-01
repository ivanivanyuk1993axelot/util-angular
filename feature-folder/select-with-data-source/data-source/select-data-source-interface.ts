import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

// Как это должно работать - мы формируем подписку на изменения существующего источника данных, в подписке обновляем
// значения свойств formControl, который будет использоваться контролом
// Обрати внимание, что при вызове setOption$ не нужно ничего делать с formControl, он должен только брать данные из
// первоисточника, менять данные в первоисточнике должен setOption$, что корректно, без цикла, изменит значение в контроле
// Обрати внимание, что в конструктор, скорее всего, нужно будет передавать changeBroadcaster для takeUntil, потому что
// подписка формируется не внутри компонента, у которого есть ngOnDestroy. Почему мы не заведём этот метод у
// SelectWithDataSourceComponent - потому что он может быть не нужен (возможно, моё мнение изменится)
export interface SelectDataSourceInterface<OptionType> {
  formControl: FormControl;

  getDisplayTextContinuous$(option: OptionType): Observable<string>;

  getLabelTextContinuous$(): Observable<string>;

  getOptionListContinuous$(): Observable<OptionType[]>;

  setOption$(option: OptionType): Observable<OptionType>;
}
