import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema, DropdownControlSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_NganhService } from './services/dm-nganh.service';
import { DM_TrinhDoDaoTaoService } from '../dm-trinhdodaotao/services/dm-trinhdodaotao.service';
@Component({
  selector: 'dm-nganh',
  templateUrl: './dm-nganh.component.html',
  styleUrls: ['./dm-nganh.component.scss']
})
export class DM_NganhComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_NganhService: DM_NganhService,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'ngành';
    this.setting.service = this._dm_NganhService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'idTrinhDoDaoTao',
        label: 'Trình độ đào tạo',
        service: this._dm_TrinhDoDaoTaoService
      }),
      new ColumnSchema({
        field: 'ma',
        label: 'Mã ngành',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'maNganhTheoBo',
        label: 'Mã ngành theo Bộ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        fullTextSearch: true,
        label: 'Tên ngành'
      }),
      new ColumnSchema({
        field: 'tenNganhTA',
        fullTextSearch: true,
        label: 'Tên ngành (EN)'
      }),
    ];
    super.ngOnInit();
  }
}
