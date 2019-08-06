import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {RouteListDataSourceInterface} from '../data-source/route-list-data-source-interface';
import {ComponentDestroyedBroadcaster} from '../../../class-folder/component-destroyed-broadcaster/component-destroyed-broadcaster';
import {ChangeBroadcaster} from '../../../class-folder/change-broadcaster/change-broadcaster';
import {takeUntil} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-route-list',
  styleUrls: ['./route-list.component.scss'],
  templateUrl: './route-list.component.html',
})
export class RouteListComponent<DataObjectType> implements OnChanges, OnDestroy {
  @Input() dataSource: RouteListDataSourceInterface<DataObjectType>;

  private _changeBroadcaster = new ChangeBroadcaster();
  private _componentDestroyedBroadcaster = new ComponentDestroyedBroadcaster();

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeBroadcaster.broadcastChange();

    this.dataSource.connect(null).pipe(
      takeUntil(this._changeBroadcaster.changeS$),
      takeUntil(this._componentDestroyedBroadcaster.componentDestroyedS$),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this._changeBroadcaster.complete();
    this._componentDestroyedBroadcaster.broadcastComponentDestroyed();
  }
}
