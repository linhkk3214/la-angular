import { Component, Injector, OnInit } from '@angular/core';
import { ListBase } from '../../shared/base-class/list-base';
import { ColumnSchema } from '../../shared/models/schema';
import { DM_TrinhDoDaoTaoService } from './services/dm-trinhdodaotao.service';

@Component({
  selector: 'dm-trinhdodaotao',
  templateUrl: './dm-trinhdodaotao.component.html',
  styleUrls: ['./dm-trinhdodaotao.component.scss']
})
export class DM_TrinhDoDaoTaoComponent extends ListBase implements OnInit {
  constructor(
    injector: Injector,
    private _dm_TrinhDoDaoTaoService: DM_TrinhDoDaoTaoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    this.setting.objectName = 'trình độ đào tạo';
    this.setting.service = this._dm_TrinhDoDaoTaoService;
    this.setting.cols = [
      new ColumnSchema({
        field: 'ma',
        label: 'Mã',
        width: '300px',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'ten',
        label: 'Tên trình độ',
        fullTextSearch: true
      }),
      new ColumnSchema({
        field: 'capDo',
        label: 'Cấp độ'
      }),
    ];
    super.ngOnInit();
  }
}
