import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_TrangThaiNguoiHocService } from './services/dm-trangthainguoihoc.service';

@Component({
  selector: 'dm-trangthainguoihoc',
  templateUrl: './dm-trangthainguoihoc.component.html',
  styleUrls: ['./dm-trangthainguoihoc.component.scss']
})
export class DM_TrangThaiNguoiHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TrangThaiNguoiHocService: DM_TrangThaiNguoiHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'trạng thái người học';
    this.setting.service = this._dm_TrangThaiNguoiHocService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên trạng thái',
        fullTextSearch: true
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
