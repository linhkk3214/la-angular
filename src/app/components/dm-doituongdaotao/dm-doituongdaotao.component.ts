import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_DoiTuongDaoTaoService } from './services/dm-doituongdaotao.service';
import { DM_HeDaoTaoService } from '../dm-hedaotao/services/dm-hedaotao.service';
@Component({
  selector: 'dm-doituongdaotao',
  templateUrl: './dm-doituongdaotao.component.html',
  styleUrls: ['./dm-doituongdaotao.component.scss']
})
export class DM_DoiTuongDaoTaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_DoiTuongDaoTaoService: DM_DoiTuongDaoTaoService,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'đối tượng đào tạo';
    this.setting.service = this._dm_DoiTuongDaoTaoService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên hệ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'idHeDaoTao',
        label: 'Hệ đào tạo',
        service: this._dm_HeDaoTaoService
      }),
      new ColumnSchema({
        field: 'soKyHieu',
        fullTextSearch: true,
        label: 'Số ký hiệu'
      }),
    ];
    super.ngOnInit();
  }
}
