import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_DonViLienKetService } from './services/dm-donvilienket.service';

@Component({
  selector: 'dm-donvilienket',
  templateUrl: './dm-donvilienket.component.html',
  styleUrls: ['./dm-donvilienket.component.scss']
})
export class DM_DonViLienKetComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DonViLienKetService: DM_DonViLienKetService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đơn vị liên kết';
    this.setting.service = this._dm_DonViLienKetService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        title: 'Mã',
        width: '140px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'diaChi',
        label: 'Địa chỉ',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'sdt',
        label: 'Số điện thoại',
        width: '200px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'nguoiDaiDien',
        label: 'Người đại diện',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'chucVu',
        width: '150px',
        label: 'Chức vụ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ghiChu',
        label: 'Ghi chú ',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
