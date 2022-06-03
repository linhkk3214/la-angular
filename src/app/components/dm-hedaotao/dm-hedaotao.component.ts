import { Component, Injector, OnInit } from '@angular/core';
import { ColumnSchema } from '../../shared/models/schema';
import { ListBase } from '../../shared/base-class/list-base';
import { DM_HeDaoTaoService } from './services/dm-hedaotao.service';

@Component({
  selector: 'dm-hedaotao',
  templateUrl: './dm-hedaotao.component.html',
  styleUrls: ['./dm-hedaotao.component.scss']
})
export class DM_HeDaoTaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_HeDaoTaoService: DM_HeDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'hệ đào tạo';
    this.setting.service = this._dm_HeDaoTaoService;
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
        field: 'tenTiengAnh',
        label: 'Tên tiếng anh',
        fullTextSearch: true
      }),
    ];
    super.ngOnInit();
  }
}
