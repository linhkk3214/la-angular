import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema, TabViewData } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DotNhapHocService } from './services/dotnhaphoc.service';
import { DataType, Operator } from 'src/app/shared/models/enums';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { GridInfo } from 'src/app/shared/models/grid-info';
import { DataSourceTrangThai } from './models/const';
@Component({
  selector: 'dotnhaphoc',
  templateUrl: './dotnhaphoc.component.html',
  styleUrls: ['./dotnhaphoc.component.scss']
})
export class DotNhapHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotnhaphocService: DotNhapHocService,
    private _dm_KhoaHocService: DM_KhoaHocService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đợt nhập học';
    this.setting.service = this._dotnhaphocService;
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã đợt',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đợt',
        fullTextSearch: true,
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService
      }),
      new ColumnSchema({
        field: 'timeBd',
        label: 'Bắt đầu',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'timeKt',
        label: 'Kết thúc',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'trangThai',
        label: 'Trạng thái',
        dataSource: DataSourceTrangThai
      })
    ];
    super.ngOnInit();
  }

  override async modifyGridInfo(gridInfo: GridInfo) {
    if (this.defaultSetting) {
      if (this.defaultSetting.idHeDaoTao) {
        gridInfo.filters.push(this.newFilter('idHeDaoTao', Operator.equal, this.defaultSetting.idHeDaoTao));
      }
    }
  }
}
