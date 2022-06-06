import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_TpHoSoService } from './services/dm-tphoso.service';
import { DM_LoaiGiayToService } from '../dm-loaigiayto/services/dm-loaigiayto.service';

@Component({
  selector: 'dm-tphoso',
  templateUrl: './dm-tphoso.component.html',
  styleUrls: ['./dm-tphoso.component.scss']
})
export class DM_TpHoSoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TpHoSoService: DM_TpHoSoService,
    private _dm_LoaiGiayToService: DM_LoaiGiayToService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'thành phần hồ sơ';
    this.setting.service = this._dm_TpHoSoService;
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
        field: 'idLoaiGiayTo',
        label: 'Loại giấy tờ',
        service: this._dm_LoaiGiayToService
      }),
      new ColumnSchema({
        field: 'tenKhiNopOnline',
        label: 'Tên khi nộp online',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
