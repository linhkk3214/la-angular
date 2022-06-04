import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_GioiTinhService } from './services/dm-gioitinh.service';

@Component({
  selector: 'dm-gioitinh',
  templateUrl: './dm-gioitinh.component.html',
  styleUrls: ['./dm-gioitinh.component.scss']
})
export class DM_GioiTinhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_GioiTinhService: DM_GioiTinhService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'giới tính';
    this.setting.service = this._dm_GioiTinhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên giới tính',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
