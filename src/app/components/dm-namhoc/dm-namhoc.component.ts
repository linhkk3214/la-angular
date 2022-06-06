import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_NamHocService } from './services/dm-namhoc.service';
import { DataType } from 'src/app/shared/models/enums';

@Component({
  selector: 'dm-namhoc',
  templateUrl: './dm-namhoc.component.html',
  styleUrls: ['./dm-namhoc.component.scss']
})
export class DM_NamHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_NamHocService: DM_NamHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'năm học';
    this.setting.service = this._dm_NamHocService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Năm học',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'tuNgay',
        label: 'Từ ngày',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'denNgay',
        label: 'Đến ngày',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'ghiChu',
        label: 'Ghi chú',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
