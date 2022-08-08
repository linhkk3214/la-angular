import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DotCapNhatHoSoNguoiHocService } from './services/dotcapnhathosonguoihoc.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';
import { DataType } from 'src/app/shared/models/enums';
@Component({
  selector: 'dotcapnhathosonguoihoc',
  templateUrl: './dotcapnhathosonguoihoc.component.html',
  styleUrls: ['./dotcapnhathosonguoihoc.component.scss']
})
export class DotCapNhatHoSoNguoiHocComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dotcapnhathosonguoihocService: DotCapNhatHoSoNguoiHocService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đợt cập nhật hồ sơ người học';
    this.setting.popupSize.width = 1100;
    this.setting.popupSize.height = 800;
    this.setting.service = this._dotcapnhathosonguoihocService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ten',
        label: 'Tên đợt',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'timeTu',
        label: 'Thời gian từ',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'timeDen',
        label: 'Thời gian đến',
        dataType: DataType.date
      }),
      new ColumnSchema({
        field: 'ghiChu',
        fullTextSearch: true,
        label: 'Ghi chú'
      }),
    ];
    super.ngOnInit();
  }
}
