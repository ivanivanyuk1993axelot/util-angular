import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicContainerComponent} from './dynamic-container/dynamic-container.component';

@NgModule({
  exports: [
    DynamicContainerComponent,
  ],
  declarations: [DynamicContainerComponent],
  imports: [
    CommonModule,
  ]
})
export class DynamicContainerModule {
}
