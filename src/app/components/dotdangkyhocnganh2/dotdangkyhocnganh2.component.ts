import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DotDangKyHocNganh2Service } from './services/dotdangkyhocnganh2.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';

import { DataType } from 'src/app/shared/models/enums';
import { DataSourceTrangThai } from '../dotnhaphoc/models/const';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DM_HocKyService } from '../dm-hocky/services/dm-hocky.service';
@Component({
  selector: 'dotdangkyhocnganh2',
  templateUrl: './dotdangkyhocnganh2.component.html',
  styleUrls: ['./dotdangkyhocnganh2.component.scss']
})
export class DotDangKyHocNganh2Component extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _DotDangKyHocNganh2Service: DotDangKyHocNganh2Service,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HocKyService: DM_HocKyService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đợt đăng ký học ngành 2';
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 700;
    this.setting.service = this._DotDangKyHocNganh2Service;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đợt',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idNamHoc',
        service: this._dm_NamHocService,
        label: 'Năm học',
      }),
      new ColumnSchema({
        field: 'idHocKy',
        service: this._dm_HocKyService,
        label: 'Học kỳ',
      }),
      new ColumnSchema({
        field: 'ngayBatDau',
        label: 'Ngày bắt đầu',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'ngayKetThuc',
        label: 'Ngày kết thúc',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai
      }),
    ];
    super.ngOnInit();
  }
}
