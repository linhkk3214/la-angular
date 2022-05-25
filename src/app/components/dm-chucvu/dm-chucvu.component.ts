import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_ChucVuService } from './services/dm-chucvu.service';

@Component({
  selector: 'dm-chucvu',
  templateUrl: './dm-chucvu.component.html',
  styleUrls: ['./dm-chucvu.component.scss']
})
export class DM_ChucVuComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_ChucVuService: DM_ChucVuService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'chức vụ';
    this.setting.service = this._dm_ChucVuService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '140px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
