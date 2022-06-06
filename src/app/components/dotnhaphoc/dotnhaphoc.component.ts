import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DotNhapHocService } from './services/dotnhaphoc.service';
import { DM_TrinhDoDaoTaoService } from '../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { DM_KhoaHocService } from '../dm-khoahoc/services/dm-khoahoc.service';
import { DM_CoSoDaoTaoService } from '../dm-cosodaotao/services/dm-cosodaotao.service';
import { DM_DonViLienKetService } from '../dm-donvilienket/services/dm-donvilienket.service';
import { DataSourceTrangThai } from './models/const';
import { DataType } from 'src/app/shared/models/enums';
@Component({
  selector: 'dotnhaphoc',
  templateUrl: './dotnhaphoc.component.html',
  styleUrls: ['./dotnhaphoc.component.scss']
})
export class DotNhapHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotnhaphocService: DotNhapHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService,
    private _dm_KhoaHocService: DM_KhoaHocService,
    private _dm_CoSoDaoTaoService: DM_CoSoDaoTaoService,
    private _dm_DonViLienKetService: DM_DonViLienKetService,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đợt nhập học';
    this.setting.service = this._dotnhaphocService;
    /* this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 650; */
    this.setting.cols = [

      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đợt',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService,
      }),
      new ColumnSchema({
        field: 'idKhoaHoc',
        label: 'Khóa học',
        service: this._dm_KhoaHocService,
      }),
      new ColumnSchema({
        field: 'timeBd',
        label: 'Thời gian bắt đầu',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'timeKt',
        label: 'Thời gian kết thúc',
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
