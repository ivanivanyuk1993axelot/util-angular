import { Pipe, PipeTransform } from '@angular/core';
import {DynamicCellComponentInterface} from '../dynamic-cell-component-interface';
import {DynamicHeaderCellComponentInterface} from '../dynamic-header-cell-component-interface';
import {TableDataSourceInterface} from '../table-data-source-interface';

@Pipe({
  name: 'getRowNgClassContinuous$Pure'
})
export class GetRowNgClassContinuous$PurePipe<CellComponentType extends DynamicCellComponentInterface<DataObjectType,
  TableDataSourceType>,
  HeaderCellComponentType extends DynamicHeaderCellComponentInterface<TableDataSourceType>,
  TableDataSourceType extends TableDataSourceInterface<CellComponentType,
    HeaderCellComponentType,
    TableDataSourceType,
    DataObjectType,
    KeyType>,
  DataObjectType = any,
  KeyType = any> implements PipeTransform {
  transform(
    tableDataSource: TableDataSourceType,
    dataObject: DataObjectType,
  ) {
    return tableDataSource.getRowNgClassContinuous$(dataObject);
  }
}
