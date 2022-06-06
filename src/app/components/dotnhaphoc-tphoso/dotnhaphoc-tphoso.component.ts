import { Component, Injector, Input, OnInit } from '@angular/core';
import { DataType, Operator } from 'src/app/shared/models/enums';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_TpHoSoService } from '../dm-tphoso/services/dm-tphoso.service';
import { DotNhapHoc_TpHoSoService } from './services/dotnhaphoc-tphoso.service';
@Component({
  selector: 'dotnhaphoc-tphoso',
  templateUrl: './dotnhaphoc-tphoso.component.html',
  styleUrls: ['./dotnhaphoc-tphoso.component.scss']
})
export class DotNhapHoc_TpHoSoComponent extends ListBase implements OnInit {
  @Input() idDotNhapHoc: string;
  hiddenTab: string[] = [];
  constructor(
    injector: Injector,
    private _dotNhapHoc_TpHoSoService: DotNhapHoc_TpHoSoService,
    private _dm_TpHoSoService: DM_TpHoSoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.title = '';
    this.setting.service = this._dotNhapHoc_TpHoSoService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idTpHoSo',
        label: 'Hồ sơ',
        service: this._dm_TpHoSoService
      }),
      new ColumnSchema({
        field: 'soLuongBanChinh',
        label: 'Bản chính',
      }),
      new ColumnSchema({
        field: 'soLuongBanSao',
        label: 'Bản sao',
      }),
      new ColumnSchema({
        field: 'soLuongBanCC',
        label: 'Bản công chứng',
      }),
      new ColumnSchema({
        field: 'nopOnline',
        label: 'Nộp online',
        dataType: DataType.boolean
      }),
      new ColumnSchema({
        field: 'nopTrucTiep',
        label: 'Nộp trực tiếp',
        dataType: DataType.boolean
      }),
    ];
    super.ngOnInit();
  }

  override async modifyGridInfo(gridInfo: GridInfo) {
    if (this.idDotNhapHoc) {
      gridInfo.filters.push(this.newFilter('idDotNhapHoc', Operator.equal, this.idDotNhapHoc));
    }
  }
}
