import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_HocKyService } from './services/dm-hocky.service';
import { DM_NamHocService } from '../dm-namhoc/services/dm-namhoc.service';
import { DataSourceLoaiHocKy } from './models/const';
import { DataType } from 'src/app/shared/models/enums';

@Component({
  selector: 'dm-hocky',
  templateUrl: './dm-hocky.component.html',
  styleUrls: ['./dm-hocky.component.scss']
})
export class DM_HocKyComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HocKyService: DM_HocKyService,
    private _dm_NamHocService: DM_NamHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'học kỳ';
    this.setting.service = this._dm_HocKyService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idNamHoc',
        label: 'Năm học',
        width: '300px',
        service: this._dm_NamHocService,
        displayField: 'namHoc'
      }),
      new ColumnSchema({
        field: 'hocKy',
        label: 'Học kỳ',
      }),
      new ColumnSchema({
        field: 'tenHocKy',
        label: 'Tên học kỳ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'tenRutGon',
        fullTextSearch: true,
        label: 'Tên rút gọn'
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
        field: 'loaiHocKy',
        label: 'Loại học kỳ',
        dataSource: DataSourceLoaiHocKy
      }),
    ];
    super.ngOnInit();
  }
}
