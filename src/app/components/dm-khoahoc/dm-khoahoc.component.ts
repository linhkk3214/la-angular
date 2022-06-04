import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_KhoaHocService } from './services/dm-khoahoc.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DataType } from 'src/app/shared/models/enums';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';

@Component({
  selector: 'dm-khoahoc',
  templateUrl: './dm-khoahoc.component.html',
  styleUrls: ['./dm-khoahoc.component.scss']
})
export class DM_KhoaHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_NamHocService: DM_NamHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'khóa học';
    this.setting.service = this._dm_KhoaHocService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã khóa học',
        fullTextSearch: true,
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên khóa học',
        fullTextSearch: true,
      }),
      new ColumnSchema({
        field: 'namHocBatDau',
        label: 'Năm học bắt đầu',
        service: this._dm_NamHocService,
        valueField: 'nam',
        displayField: 'namHoc'
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
      }),
    ];
    super.ngOnInit();
  }
}
