import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DotNhapHoc_HoSoService } from './services/dotnhaphoc-hoso.service';
import { DotNhapHocService } from '../dotnhaphoc/services/dotnhaphoc.service';
import { DM_TpHoSoService } from '../dm-tphoso/services/dm-tphoso.service';
@Component({
  selector: 'dotnhaphoc-hoso',
  templateUrl: './dotnhaphoc-hoso.component.html',
  styleUrls: ['./dotnhaphoc-hoso.component.scss']
})
export class DotNhapHoc_HoSoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotnhaphoc_hosoService: DotNhapHoc_HoSoService,
    private _DotNhapHocService: DotNhapHocService,
    private _dm_TpHoSoService: DM_TpHoSoService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đợt nhập học - hồ sơ';
    this.setting.service = this._dotnhaphoc_hosoService;
    /* this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650; */
    this.setting.cols = [
      new ColumnSchema({
        field: 'idDotNhapHoc',
        label: 'Đợt nhập học',
        service: this._DotNhapHocService
      }),
      new ColumnSchema({
        field: 'idTpHoSo',
        label: 'Tên hồ sơ',
        service: this._dm_TpHoSoService
      }),
      new ColumnSchema({
        field: 'soLuongBanChinh',
        label: 'Số lượng bản chính'
      }),
      new ColumnSchema({
        field: 'soLuongBanSao',
        label: 'Số lượng bản sao'
      }),
      new ColumnSchema({
        field: 'soLuongBanCC',
        label: 'Số lượng bản công chứng'
      }),
    ];
    super.ngOnInit();
  }
}
